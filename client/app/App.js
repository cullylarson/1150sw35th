import React from 'react'
import {connect} from 'react-redux'
import Form from '@app/form/Form'

import './style/app.css'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({})

const App = () => {
    return (
        <div className='app-wrapper'>
            <div className='container'><div className='row'><div className='col-sm'>
                <h1>1150 SW 35th St.</h1>
                <h3>Corvallis, OR 97333</h3>

                <h2>Rental Application</h2>

                <Form />
            </div></div></div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
