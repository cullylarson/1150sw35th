const formRepo = require('./form-repository')
const entryView = require('./entry-view')

module.exports = {
    view: (pool) => (req, res) => {
        const publicId = req.params.publicId

        const fourOhFour = () => {
            res
                .status(404)
                .send('Page not found.')
        }

        if(!publicId) {
            return fourOhFour()
        }

        formRepo.getOneByPublicId(pool, publicId)
            .then(entry => {
                if(!entry) {
                    return fourOhFour()
                }

                res.send(entryView.render(entry))
            })
            .catch(_ => {
                res.status(500).send('Error.')
            })

    },
}
