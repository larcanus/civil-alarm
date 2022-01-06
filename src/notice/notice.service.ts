import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from "@nestjs/typeorm";
import { FilterEntity } from "@app/entity/filter.entity";
import { Repository } from "typeorm";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { NoticeEntity } from "@app/entity/notice.entity";
import { UserEntity } from "@app/entity/user.entity";

@Injectable()
export class NoticeService {
    constructor(
        private readonly http: HttpService,
        @InjectRepository( FilterEntity ) private readonly filterRepository: Repository<FilterEntity>,
        @InjectRepository( NoticeEntity ) private readonly noticeRepository: Repository<NoticeEntity>
    ) {
    }

    async getNoticeByUserId( userId: number ): Promise<NoticeEntity[]> {
        return this.noticeRepository.find( { where: [ { user: userId } ], order: { created_at: "DESC" }, take: 10 } );
    }

    private readonly logger = new Logger( NoticeService.name );

    @Cron( '60 * * * * *' )
    async handleCron() {
        this.logger.debug( 'Called when the current second is 60' );
        await this.mainRequester();
    }

    async mainRequester() {
        const activeUserFilters = await this.getAllActiveFilter();

        for ( let i = 0; i < activeUserFilters.length; i++ ) {
            const filters = activeUserFilters[ i ];
            const { user } = filters;

            if ( filters.active_1 ) {
                const { filter_1, subject_1, name_1 } = filters;
                ( await this.getNoticeByFilter( filter_1, subject_1 ) ).subscribe(
                    ( response ) => {
                        this.strokeNotice( response.data.searchResult, user, name_1 );
                    },
                )
            }

            if ( filters.active_2 ) {
                const { filter_2, subject_2, name_2 } = filters;
                ( await this.getNoticeByFilter( filter_2, subject_2 ) ).subscribe(
                    ( response ) => {
                        this.strokeNotice( response.data.searchResult, user, name_2 );
                    },
                )
            }
        }
    }

    async getAllActiveFilter(): Promise<FilterEntity[]> {
        return await this.filterRepository.find( {
            relations: [ "user" ],
            where: [ { active_1: "true" }, { active_2: "true" } ] // or
        } );
    }

    async getNoticeByFilter( filter: string, subject: string ): Promise<Observable<AxiosResponse>> {
        const https = require( 'https' );
        const { v4: uuidv4 } = require( 'uuid' );
        const date = new Date();
        const subjectFilter = subject !== '' ? `{
            "name": "case_doc_subject_rf",
            "operator": "EX",
            "query": "${ subject }",
            "fieldName": "case_doc_subject_rf_cat"
        }` : '';

        const headersRequest = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const data = {
            "request": {
                "type": "MULTIQUERY",
                "multiqueryRequest": {
                    "queryRequests": [
                        {
                            "type": "Q",
                            "queryRequestRole": "SIMPLE",
                            "request": `{"query":"${ filter }","type":"QUERY","mode":"SIMPLE"}`,
                            "operator": "AND"
                        },
                        {
                            "type": "Q",
                            "request": `{"mode":"EXTENDED","typeRequests":[{"fieldRequests":[
                            {"name":"case_user_doc_entry_date","operator":"B","query":"2021-01-05T18:47:23.134Z","fieldName":"case_user_doc_entry_date"},
                            ${ subjectFilter }],
                            "mode":"AND","name":"common","typesMode":"AND"}]}`,
                            "operator": "AND",
                            "queryRequestRole": "CATEGORIES"
                        },
                    ]
                },
                "sorts": [ { "field": "score", "order": "desc" } ],
                "simpleSearchFieldsBundle": "default",
                "noOrpho": false,
                "start": 0,
                "rows": 10,
                "uid": `${ uuidv4() }`,
                "facet": { "field": [ "type" ] },
                "facetLimit": 21,
                "additionalFields": [
                    "court_document_documentype1", "court_case_entry_date", "court_case_result_date", "court_subject_rf",
                    "court_name_court", "court_document_law_article", "court_case_result", "case_user_document_type",
                    "case_user_doc_entry_date", "case_user_doc_result_date", "case_doc_subject_rf", "case_user_doc_court",
                    "case_doc_instance", "case_document_category_article", "case_user_doc_result", "case_user_entry_date",
                    "m_case_user_type", "m_case_user_sub_type", "ora_main_law_article"
                ],
                "hlFragSize": 1000,
                "groupLimit": 3,
                "woBoost": false
            }, "doNotSaveHistory": false
        };

        const dataJson = JSON.stringify( data );

        return this.http.post( "https://bsr.sudrf.ru/bigs/s.action", dataJson,
            {
                headers: headersRequest,
                httpsAgent: new https.Agent( { rejectUnauthorized: false } )
            } );
    }

    async strokeNotice( searchResult: any, currentUser: UserEntity, nameFilter: string ) {
        const newNotice = new NoticeEntity();
        if ( searchResult && searchResult?.documents && searchResult?.documents.length > 0 ) {
            newNotice.documents = JSON.stringify( searchResult.documents );
        } else {
            newNotice.documents = '';
        }
        newNotice.filter_name = nameFilter;
        newNotice.user = currentUser;
        await this.putNotice( newNotice );
    }

    async putNotice( newNotice: NoticeEntity ) {
        await this.noticeRepository.save( newNotice );
    }
}