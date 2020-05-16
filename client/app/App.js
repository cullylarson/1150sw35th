import {h} from 'preact'
import {connect} from 'preact-redux'
import Form from '@app/form/Form'
import PhotoSlider from '@app/components/PhotoSlider'
import {scrollTo} from '@app/lib/scroll'
import {preventDefault} from '@app/lib/events'

import './style/app.css'

const mapStateToProps = ({config}) => ({config})
const mapDispatchToProps = (dispatch) => ({})

const renderContact = (email, phone) => {
    if(!email && !phone) return ''

    const pieces = [
        email ? (<span>email <a href={`mailto:${email}`}>{email}</a></span>) : null,
        phone ? (<span>call <a href={`tel:${phone.replace(/[^0-9]/g, '')}`}>{phone}</a></span>) : null,
    ].filter(x => !!x)

    return pieces.length > 1
        ? <p>For more information or questions, {pieces[0]} or {pieces[1]}.</p>
        : <p>For more information or questions, {pieces[0]}.</p>
}

const App = ({config}) => {
    const handleApplyClick = preventDefault(() => {
        scrollTo(document.getElementById('apply'))
    })

    return (
        <div className='app-wrapper'>
            <div className='container'><div className='row'><div className='col-sm'>
                <header>
                    <h1>1150 SW 35th St.</h1>
                    <h4>Corvallis, OR 97333</h4>

                    <p>{'2 beds \u00b7 1 bath \u00b7 1,296 sqft'}</p>

                    <p><strong>Details</strong></p>

                    <ul>
                        <li>Rent: $1,300</li>
                        <li>Available: July 7th, 2020</li>
                        <li>Washer & dryer in unit</li>
                        <li>Wood fireplace</li>
                        <li>Covered deck</li>
                        <li>Large, fenced-in backyard</li>
                        <li>Plenty of parking</li>
                        <li>Dishwasher</li>
                        <li>Trash pickup and water included</li>
                        <li>Refundable security deposit: $1,300</li>
                        <li><a href='#apply' onClick={handleApplyClick}>Apply below</a></li>
                    </ul>

                    {renderContact(config.contact.email, config.contact.phone)}
                </header>
            </div></div></div>

            <PhotoSlider
                imageUrls={[
                    '/images/1.jpg',
                    '/images/2.jpg',
                    '/images/3.jpg',
                    '/images/4.jpg',
                    '/images/5.jpg',
                    '/images/6.jpg',
                    '/images/7.jpg',
                    '/images/8.jpg',
                    '/images/9.jpg',
                ]}
                autoSlide={4000}
            />

            <a name='apply' id='apply' />
            <div className='container'><div className='row'><div className='col-sm'>
                <h2>Rental Application</h2>
            </div></div></div>

            <Form />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
