import * as express from 'express';
import {Request, Response} from 'express';

const app = express();
const {port = 3000} = process.env;

app.get('', (req: Request, res: Response) => {
    res.send({
        message: 'hello world!',
    })
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
}

export default app;