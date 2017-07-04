import claimsHandler from './claimsHandler';

export default (router) => {
    router.get('/get_all_claims', (req, res) => {
        claimsHandler.get_all_claims((resData) => {
            res.json(resData);
        });
    });

    router.post('/insert_claim_details', (req, res) => {
        claimsHandler.insert_claim_details(req.body, (isSuccess) => {
            if (isSuccess)
                res.sendStatus(200);
        });
    });

    router.post('/insert_claim_formulas', (req, res) => {
        claimsHandler.insert_claim_formulas(req.body, () => {
            res.sendStatus(200);
        });
    });

    router.post('/insert_claim_substantiations', (req, res) => {
        claimsHandler.insert_claim_substantiations(req.body, () => {
            res.sendStatus(200);
        });
    });

};