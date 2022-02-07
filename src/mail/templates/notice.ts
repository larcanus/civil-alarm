export function fillHtml( filter: string, documents ): string {
    let trs = '';
    let advise = '';
    if ( documents.length >= 10 ) {
        advise = `<p>У вас много результатов, в этом случае лучше проверить ваш фильтр в ручном режиме 
                    <a href="https://bsr.sudrf.ru/bigs/portal.html">тут</a> 
                    и сузить его поиск по субьекту. </p>`
    }

    documents.forEach( doc => {
        const tr = `
        <tr style="height: 23px; border: solid #d0e6f9;">
            <td style="width: 10%; height: 23px; ">
                <h4><a href="https://bsr.sudrf.ru/bigs/portal.html">${ doc.name }</a></h4>
                <p>${ doc.additionalFields[ 3 ] && doc.additionalFields[ 3 ].value ? doc.additionalFields[ 3 ].value : 'нет данных' }</p>
                <p>${ doc.additionalFields[ 4 ] && doc.additionalFields[ 4 ].value ? doc.additionalFields[ 4 ].value : 'нет данных о суде' }</p>
            </td>
        </tr>`
        trs += tr;
    } );

    const noticeTable = `<table style="height: 63px; width: 50%; border-collapse: collapse; text-align: left; 
    border: solid #d0e6f9;
    margin-left: auto; margin-right: auto;" border="1">
        <tbody>
            ${ trs }
        </tbody>
    </table>`

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="ru">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width"/>
        
            <style type="text/css">
                * { margin: 0;
                    padding: 0;
                    font-size: 100%;
                    font-family: 'Avenir Next', "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
                    line-height: 1.65; }
                img { max-width: 100%;
                      margin: 0 auto;
                      display: block; }
                body, .body-wrap { width: 100% !important;
                                   height: 100%;
                                   background: #efefef;
                                   -webkit-font-smoothing: antialiased;
                                   -webkit-text-size-adjust: none; }
                a { color: #eb4141; text-decoration: none; }
                .text-center { text-align: center; }
                .text-right { text-align: right; }
                .text-left { text-align: left; }
                .button { display: inline-block;
                          color: white;
                          background: #397cdc;
                          border: solid #397cdc;
                          border-width: 10px 20px 8px;
                          font-weight: bold;
                          border-radius: 4px; }
        
                h1, h2, h3, h4, h5, h6 { margin: 5px 0 5px 0;line-height: 1.25; }
                h1 { font-size: 32px; }
                h2 { font-size: 28px; }
                h3 { font-size: 24px; }
                h4 { font-size: 20px; }
                h5 { font-size: 16px; }
                p, ul, ol { font-size: 16px; font-weight: normal; }
                td{ padding-left: 10px; }    
                .container {
                    display: block !important;
                    clear: both !important;
                    margin: 0 auto !important;
                    max-width: 580px !important; }
                .container table {
                    width: 100% !important;
                    border-collapse: collapse; }
                .container .masthead {
                    padding: 80px 0;
                    background: #eb4141;
                    color: white; }
                .container .masthead h1 {
                    margin: 0 auto !important;
                    max-width: 90%;
                    text-transform: uppercase; }
                .container .content {
                    background: white;
                    padding: 30px 35px; }
                .container .content.footer {
                    background: none; }
                .container .content.footer p {
                    margin-bottom: 0;
                    color: #888;
                    text-align: center;
                    font-size: 14px; }
                .container .content.footer a {
                    color: #888;
                    text-decoration: none;
                    font-weight: bold; }
            </style>
        </head>
        <body>
            <table class="body-wrap">
                <tr>
                    <td class="container">
                        <table>
                            <tr>
                                <td align="center" class="masthead">
                                    <h1>Тревога!</h1>
                                    <h2>По вашему запросу был получен результат!</h2>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <h3>
                                    ${ filter }
                                    </h3>
                                    ${ noticeTable }
                                    <br/>
                                    ${ advise }
                                    <table style="margin-top: 20px;">
                                        <tr>
                                            <td align="center">
                                                <p>
                                                    <a href="https://civilalarm.ru" class="button">На сайт!</a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="container">
                        <table>
                            <tr>
                                <td class="content footer" align="center">
                                    <p>Отправлено: <a href="https://civilalarm.ru">Civil Alarm</a></p>
                                    <p>По всем вопросам: <a href="mailto:civilalarm-sup@yandex.com">civilalarm-support@yandex.com</a></p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>`;
}

