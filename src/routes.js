import { Dataset, createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async (params) => {
    const { log, body, request } = params;
    let { rows } = JSON.parse(body);
    for(let row of rows){
        log.info(`${row.title}`, { url: request.loadedUrl });
        await Dataset.pushData({
            title : row.title,
            author: row.field_author.replace( /(<([^>]+)>)/ig, ''),
            year  : row.field_date_published,
            poem_html: row.body,
            poem  : row.body
            .replace(/\s?(<br\s?\/?>)\s?/g, "\r\n")
            .replace( /(<([^>]+)>)/ig, ''),
        });
    }

});

