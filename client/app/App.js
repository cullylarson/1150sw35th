import React from 'react'
import {connect} from 'react-redux'
import Form from '@app/form/Form'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({})

const App = () => {
    return <Form />
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
