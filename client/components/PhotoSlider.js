import {h, Component} from 'preact'
import Hammer from 'hammerjs'

import './style/photo-slider.css'

const imageLoaded = el => {
    return new Promise((resolve, reject) => {
        el.addEventListener('load', () => {
            resolve(el)
        })
    })
}

// runs f while transitions are disabled, then re-enables them
const disableTransition = (el, f) => {
    el.style.transition = 'none'
    f()
    flushCss(el)
    el.style.transition = ''
}

const flushCss = el => {
    // By reading the offsetHeight property, we are forcing
    // the browser to flush the pending CSS changes (which it
    // does to ensure the value obtained is accurate).
    const _ = el.offsetHeight // eslint-disable-line no-unused-vars
}

const transitionComplete = el => {
    const whichTransitionEvent = el => {
        const transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd',
        }

        for(var t in transitions) {
            if(el.style[t] !== undefined) {
                return transitions[t]
            }
        }
    }

    const transitionEvent = whichTransitionEvent(el)
    if(!transitionEvent) return Promise.resolve()

    return new Promise((resolve, reject) => {
        el.addEventListener(transitionEvent, () => resolve())
    })
}

export default class extends Component {
    constructor(props) {
        super(props)

        this.imagesRef = undefined

        this.autoSlideTimer = undefined

        this.state = {
            page: 1,
            imageGroupWidth: 0,
            allLoaded: false,
            moving: false,
        }
    }

    updateImagesOffset = () => {
        if(!this.state.allLoaded) return
        if(!this.imagesRef) return

        const offsetLeft = this.getLeftOffset(this.state.page)

        this.imagesRef.style.left = `${offsetLeft}px`
        return transitionComplete(this.imagesRef)
    }

    getLeftOffset = page => {
        const imagesEl = this.imagesRef
        const imageEls = imagesEl.querySelectorAll('img')

        if(!imageEls || !imageEls.length) return 0

        const getPageOffsetPositive = () => {
            return [...imageEls].reduce((acc, el, i) => {
                return i >= page - 1
                    // done
                    ? acc
                    : acc - el.clientWidth
            }, 0)
        }

        const getPageOffsetNegative = () => {
            const lastPage = this.getLastPage()
            const pageLimit = lastPage - page

            return [...imageEls].reduce((acc, el, i) => {
                return i < pageLimit - 1 || i >= lastPage
                    // done
                    ? acc
                    : acc + el.clientWidth
            }, 0)
        }

        const baseOffsetLeft = this.getBaseOffsetLeft()

        return page > 0
            ? baseOffsetLeft + getPageOffsetPositive()
            : baseOffsetLeft + getPageOffsetNegative()
    }

    getBaseOffsetLeft = () => {
        // we want to start after the two sections of images to make transitions look better
        return -1 * 2 * this.state.imageGroupWidth
    }

    onResize = () => {
        this.setState({
            page: 1,
            moving: false,
            imageGroupWidth: this.getImageGroupWidth(),
        })
        this.resetToBeginning()
    }

    // we add multiple copies of images for looks. this gets the width
    // of just one section of them
    getImageGroupWidth = () => {
        if(!this.imagesRef) return

        const imagesEl = this.imagesRef
        const imageEls = imagesEl.querySelectorAll('img')
        const numImages = this.props.imageUrls.length

        if(!imageEls || !imageEls.length || !numImages) return 0

        return [...imageEls].reduce((acc, el, i) => {
            return i >= numImages
                // done
                ? acc
                : acc + el.clientWidth
        }, 0)
    }

    resetToBeginning = () => {
        disableTransition(this.imagesRef, () => {
            const offsetLeft = this.getLeftOffset(1)
            this.imagesRef.style.left = `${offsetLeft}px`
        })
    }

    resetToEnd = () => {
        disableTransition(this.imagesRef, () => {
            const offsetLeft = this.getLeftOffset(this.getLastPage())
            this.imagesRef.style.left = `${offsetLeft}px`
        })
    }

    getLastPage = () => {
        return this.props.imageUrls
            ? this.props.imageUrls.length
            : 0
    }

    componentDidUpdate(prevProps, prevState) {
        const lastPage = this.getLastPage()

        // need to do this one the first page load, so we don't show a transition going to
        // the position we want to start from
        if(this.state.page === 1 && prevState.page === 1) {
            this.resetToBeginning()
        }

        this.updateImagesOffset()
            .then(() => {
                // if we moved to the first page
                if(this.state.page === lastPage + 1 && prevState.page !== lastPage + 1) {
                    this.resetToBeginning()
                    this.setState({page: 1, moving: false})
                }
                // if we moved to the last page
                else if(this.state.page === 0 && prevState.page !== 0) {
                    this.resetToEnd()
                    this.setState({page: lastPage, moving: false})
                }
                else {
                    this.setState({moving: false})
                }
            })
    }

    resetAutoSlide = () => {
        if(this.autoSlideTimer) clearTimeout(this.autoSlideTimer)
        if(!this.props.autoSlide) return

        this.autoSlideTimer = setTimeout(this.goRight, this.props.autoSlide)
    }

    componentDidMount() {
        if(!this.imagesRef) return

        const imagesEl = this.imagesRef
        const imageEls = imagesEl.querySelectorAll('img')

        // wait for all images to load
        Promise.all([...imageEls].map(imageLoaded))
            .then(() => {
                const hammer = new Hammer(this.imagesRef, {})
                hammer.on('swipe', e => {
                    if(e.direction === Hammer.DIRECTION_LEFT) this.goRight()
                    else if(e.direction === Hammer.DIRECTION_RIGHT) this.goLeft()
                })

                window.addEventListener('resize', this.onResize)

                this.resetAutoSlide()
                this.setState({
                    allLoaded: true,
                    imageGroupWidth: this.getImageGroupWidth(),
                })
            })
    }

    goLeft = () => {
        if(!this.state.allLoaded || this.state.moving) return

        this.setState((prevState) => ({page: prevState.page - 1, moving: true}))
        this.resetAutoSlide()
    }

    goRight = () => {
        if(!this.state.allLoaded || this.state.moving) return

        this.setState((prevState) => ({page: prevState.page + 1, moving: true}))
        this.resetAutoSlide()
    }

    render() {
        const {imageUrls} = this.props

        // just render the images a few times and hope that's enough to fill available space
        const imageUrlsToRender = [
            ...imageUrls,
            ...imageUrls,
            ...imageUrls,
            ...imageUrls,
            ...imageUrls,
        ]

        const renderImage = (url, i) => {
            return (
                <div className='image' key={i}>
                    <img src={url} />
                </div>
            )
        }

        return (
            <div className='photo-slider'>
                <div className='images' ref={x => { if(x) this.imagesRef = x }}>
                    {imageUrlsToRender.map(renderImage)}
                </div>

                {this.state.allLoaded ? (<div className='action action-left' onClick={this.goLeft} />) : ''}
                {this.state.allLoaded ? (<div className='action action-right' onClick={this.goRight} />) : ''}
            </div>
        )
    }
}
