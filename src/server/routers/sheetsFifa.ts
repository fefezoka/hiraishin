import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import creds from 'boxwood-charmer-436317-b3-1cccc8930f73.json'
import { procedure, router } from '../trpc';


const serviceAccountAuth = new JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ['https://www.googoleapis.com/auth/spreadsheets'],
});

export const fifaRouter = router({
    getSheetData: procedure.query(async () => {
        const doc = new GoogleSpreadsheet ('1INObmp-0-mfdZCNTwyptcchLe6l7FKO572vr1BTM4Yg', serviceAccountAuth)
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        return rows.map(row => row.get);
    })
});