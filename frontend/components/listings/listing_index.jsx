import React from "react";
import ListingIndexItem from "./listing_index_item";
import ListingMap from "../listings/listing_map";
import Navbar from "../navbar/navbar_container";
import {convertMoment} from "../helper_methods/helper_methods.jsx";

export default class ListingIndex extends React.Component {
  constructor(props) {
    super(props);
    if(this.props.history.location.state) {
      this.state = {
        searchTerm: this.props.history.location.state.detail,
        startDate: this.props.history.location.state.startDate,
        endDate: this.props.history.location.state.endDate,
        guests: this.props.history.location.state.guests,
        hovered: [null, null],
        priceFilterOpen: false,
        inputLeft: "0",
        leftMax: "999",
        inputRight: "1000",
        rightMin:"1",
        minFocus: false,
        maxFocus: false,
      };
    } else {
      this.state = {
        searchTerm: "",
        startDate: null,
        endDate: null,
        guests: 0,
        hovered: [null, null],
        priceFilterOpen: false,
        inputLeft: "0",
        leftMax: "999",
        inputRight: "1000",
        rightMin: "1",
        minFocus: false,
        maxFocus: false,
      };
    }
    this.filteredListings = this.filteredListings.bind(this);
    this.allPropsOrFiltered = this.allPropsOrFiltered.bind(this);
    this.setHoveredListItem = this.setHoveredListItem.bind(this);
    this.unhovered = this.unhovered.bind(this);
    this.togglePriceFilter = this.togglePriceFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.runScript = this.runScript.bind(this);
    this.handleClickOutsidePriceFilter = this.handleClickOutsidePriceFilter.bind(this);
    this.toggleFocusMin = this.toggleFocusMin.bind(this);
    this.toggleFocusMax = this.toggleFocusMax.bind(this);
    this.keyInputPriceMin = this.keyInputPriceMin.bind(this);
  }

  componentDidMount() {
    window.scroll(0,0)
    this.props.fetchReviews("all");
    document.addEventListener('mouseup', this.handleClickOutsidePriceFilter);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutsidePriceFilter);
    this.props.history.replace({
      search: ``,
    });
  }

  componentDidUpdate(newProps) {
    if(this.props !== newProps) {
      if (newProps.location.state) {
        this.setState({ 
          searchTerm: newProps.location.state.detail,
          endDate: newProps.location.state.endDate,
          startDate: newProps.location.state.startDate,
          guests: newProps.location.state.guests
         }, () => {
          return
        })
      }
    }
    
    if (newProps.location.state) {
      if ((newProps.location.state.detail === "") && (this.state.searchTerm !== "")) {
        this.setState({ searchTerm: "" }, () => {
          return
        })
      }
    }

    if (this.state.priceFilterOpen) {
      this.runScript()
    } 
  }

  unhovered() {
    let newArray = this.state.hovered.slice(1).concat(null);
    this.setState({ hovered: newArray })
  }

  setHoveredListItem(listing) {
    let newArray = this.state.hovered.slice(1).concat(listing);
    this.setState({ hovered: newArray})
  }

  filteredListings(state, props) {
    let list = [];

    props.listings.forEach(function (listing) {
      const matched = listing.address.toLowerCase().includes(state.searchTerm.toLowerCase());
      const noZipArray = listing.address.split(" ");
      const noZip = noZipArray.slice(0, noZipArray.length - 1);
      const newAddress = noZip.join(" ");
      const newList = Object.assign({},listing);
      newList.address = newAddress

      if (matched) {
        list.push(newList);
      }
    });

    if(list.length) {
      return list;
    } else {
      return this.props.listings;
    }
  }
  
  allPropsOrFiltered(state, props) {
    if (this.state.searchTerm === "") {
      return this.props.listings
    } else {
      return this.filteredListings(state, props)
    }
  }

  togglePriceFilter() {
    this.setState({priceFilterOpen: !this.state.priceFilterOpen})
  }

  handleChange(e) {
    if(e.target.id === "inputLeft") {
      document.getElementById("inputLeft").value = e.target.value
      this.setState({ 
        rightMin: `${+e.target.value + 1}`,
        [e.target.id]: e.target.value,
      })
    } else {
      document.getElementById("inputRight").value = e.target.value
      this.setState({
        leftMax: `${+e.target.value - 1}`,
        [e.target.id]: e.target.value,
      })
    }
    
  }

  runScript() {
    if (document.getElementById("input-left")) {
      let inputLeft = document.getElementById("input-left");
      let inputRight = document.getElementById("input-right");
      let priceLeft = document.getElementById("price-filter-min");
      let priceRight = document.getElementById("price-filter-max");
  
      let thumbLeft = document.querySelector(".slider > .thumb.left");
      let thumbRight = document.querySelector(".slider > .thumb.right");
      let range = document.querySelector(".slider > .range");
  
      function setLeftValue() {
      let _this = inputLeft,
        min = parseInt(_this.min),
        max = parseInt(_this.max);
  
        _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 50);
        priceLeft.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 50);
  
        let percent = ((_this.value - min) / (max - min)) * 100;
  
        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";
      }
      setLeftValue();
  
      function setRightValue() {
        let _this = inputRight,
          min = parseInt(_this.min),
          max = parseInt(_this.max);
  
        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 50);
        priceRight.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 50);
  
        let percent = ((_this.value - min) / (max - min)) * 100;
  
        thumbRight.style.right = (100 - percent) + "%";
        range.style.right = (100 - percent) + "%";
      }
      setRightValue();
  
      inputLeft.addEventListener("input", setLeftValue);
      inputRight.addEventListener("input", setRightValue);
  
      inputLeft.addEventListener("mouseover", function () {
        thumbLeft.classList.add("hover");
      });
      inputLeft.addEventListener("mouseout", function () {
        thumbLeft.classList.remove("hover");
      });
      inputLeft.addEventListener("mousedown", function () {
        thumbLeft.classList.add("active");
      });
      inputLeft.addEventListener("mouseup", function () {
        thumbLeft.classList.remove("active");
      });
  
      inputRight.addEventListener("mouseover", function () {
        thumbRight.classList.add("hover");
      });
      inputRight.addEventListener("mouseout", function () {
        thumbRight.classList.remove("hover");
      });
      inputRight.addEventListener("mousedown", function () {
        thumbRight.classList.add("active");
      });
      inputRight.addEventListener("mouseup", function () {
        thumbRight.classList.remove("active");
      });
      
    }
  }

  handleClickOutsidePriceFilter(e) {
    const clickPriceMenu = this.price && this.price.contains(e.target)
    const clickPriceButton = this.priceButton && this.priceButton.contains(e.target) === true
    const clickOutPrice = !(clickPriceMenu || clickPriceButton)
    const priceShouldClose = this.price && clickOutPrice
    if (priceShouldClose) {
      this.setState({ priceFilterOpen: false })
    }
  }

  toggleFocusMin() {
    this.setState({ minFocus: !this.state.minFocus})
  }

  toggleFocusMax() {
    this.setState({ maxFocus: !this.state.maxFocus})
  }

  keyInputPriceMin(e) {
    const priceMin = document.getElementById("price-filter-min")
    const priceMinValue = document.getElementById("price-filter-min").value
    const priceMinMinimum = document.getElementById("price-filter-min").min
    const priceMinMaximum = document.getElementById("price-filter-min").max
    const leftInput = document.getElementById("input-left")

    if (+priceMinValue > +priceMinMaximum) {
      debugger
      document.getElementById("price-filter-max").value = `1000`
      document.getElementById("price-filter-min").value = `${+priceMinMaximum - 50}`
    }

    leftInput.value = priceMin.value
    this.setState({})
  }

  render() {

    const sidenav = (
      <div className="sidenav">
        <ListingMap 
          listings={this.allPropsOrFiltered(this.state, this.props)} 
          updateFilter={this.props.updateFilter } 
          hovered={this.state.hovered}
        />
      </div>
    );

    const ifSearch = (searchTerm) => {
      let text = `Showing results for "${this.state.searchTerm}" in New York`

      if(this.state.searchTerm !== "") {
        return (
        <div className="if-search-container">
          <div className="if-search">{text}</div>
        </div>
        )
      }
    }

    const miniText = () => {
      const numStays = `${this.props.listings.length} stays`
      
      const guests = () => {
        if(this.state.guests === 1) {
          return `${this.state.guests} guest`;
        } else {
          return `${this.state.guests} guests`;
        }
      }
      
      const ifStartorEnd = () => {
        
        if(convertMoment(this.state.startDate, this.state.endDate) === "") {
          return ""
        } else {
          return `· ${convertMoment(this.state.startDate, this.state.endDate)}`
        }
      }

      const ifGuests = () => {
        if(this.state.guests) {
          return `· ${guests()}`
        } else {
          return ""
        }
      }

      return `${numStays} ${ifStartorEnd()} ${ifGuests()}`
    }

    const isPriceFilterPressed = () => {
      if(this.state.priceFilterOpen) {
        return "list-header-filter-button-pressed"
      } else {
        return "list-header-filter-button"
      }
    }

    const isMinFocused = () => {
      if(this.state.minFocus) {
        return (
          "price-filter-main-price-range-display-minmax-container-focus"
        )
      } else {
        return (
          "price-filter-main-price-range-display-min-container"
        )
      }
    }
    
    const isMaxFocused = () => {
      if(this.state.maxFocus) {
        return (
          "price-filter-main-price-range-display-minmax-container-focus"
        )
      } else {
        return (
          "price-filter-main-price-range-display-max-container"
        )
      }
    }

    const priceFilter = () => {
      if(this.state.priceFilterOpen) {
        return (
          <div 
          className="price-filter-container"
          ref={price => this.price = price}
          >
            <div className="price-filter-main-container">
              <div className="price-filter-main-frame">
                <div className="price-filter-main-avg-text">
                  The average nightly price is $GET AVG NIGHTLY PRICE
                </div>
                <div className="price-filter-main-display-dir">
                  <div className="price-filter-main-graph-container">
                    <div className="price-filter-main-graph-display-container">
                      <div className="price-filter-main-graph-display1toMany">


                      </div>
                    </div>
                    <div className="price-filter-main-graph-slider-container">
                      <input type="range" id="input-left" min="10" max="1000" defaultValue="0"/>
                      <input type="range" id="input-right" min="10" max="1000" defaultValue="1000"/>
                      <div className="slider">
                        <div className="track"></div>
                        <div className="range"></div>
                        <div className="thumb left">
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                        </div>
                        <div className="thumb right">
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                          <div className="price-filter-main-graph-slider-button-line" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="price-filter-main-price-range-display-container">
                    <div 
                    className={isMinFocused()}
                    onBlur={this.toggleFocusMin}
                    onFocus={this.toggleFocusMin}
                    >
                      <label className="price-filter-main-price-range-display-minmax-frame">
                        <div className="price-filter-main-price-range-display-minmax-text-frame">
                          <div className="price-filter-main-price-range-display-minmax-text">
                            min price
                          </div>
                        </div>
                        <div dir="ltr">
                          <div className="price-filter-main-price-value-container">
                            <div className="price-filter-main-price-value-money">
                              <span>$</span>
                            </div>
                            <input 
                            className="price-filter-main-price-value-input"
                            id="price-filter-min"
                            type="number"
                            readOnly={false}
                            autoComplete="off"
                            defaultValue="10"
                            min="10"
                            max="1000"
                            onKeyUpCapture={this.keyInputPriceMin}
                            >
                            </input>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="price-dash">–</div>
                    <div 
                    className={isMaxFocused()}
                    onBlur={this.toggleFocusMax}
                    onFocus={this.toggleFocusMax}
                    >
                      <label className="price-filter-main-price-range-display-minmax-frame">
                        <div className="price-filter-main-price-range-display-minmax-text-frame">
                          <div className="price-filter-main-price-range-display-minmax-text">
                            max price
                          </div>
                        </div>
                        <div dir="ltr">
                          <div className="price-filter-main-price-value-container">
                            <div className="price-filter-main-price-value-money">
                              <span>$</span>
                            </div>
                            <input 
                            className="price-filter-main-price-value-input"
                            id="price-filter-max"
                            type="number"
                            readOnly={false}
                            autoComplete="off"
                            min="10"
                            max="1000"
                            defaultValue="1000"
                            >
                            </input>
                          </div>
                        </div>
                      </label>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return <></>
      }
    }
    

    const listIndexItem = (
      <div className="list-body">
        <div className="list-header-container">
          <div className="list-header-top">
            <section>
              <div className="list-header-list-items-mini-text">
                {miniText()}
              </div>
              <div className="list-header-list-items-description">
                <h1 className="list-header-list-items-description-text">
                  Stays in New York
                </h1>
              </div>
            </section>
          </div> 
          <div className="list-header-filter-container">
            <div className="list-header-filter-frame">
              <div className="list-header-filter-frame-inner">
                <div 
                className="list-header-filter-frame-inner-inner"
                ref={priceButton => this.priceButton = priceButton}>
                  <div className="list-header-filter-frame-inner-inner">
                    <div className="list-header-filter-button-container">
                      <button 
                      className={isPriceFilterPressed()}
                      onClick={this.togglePriceFilter}>
                          <span className="list-header-filter-button-text">
                            Price
                          </span>
                      </button>
                    </div>
                    {priceFilter()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {ifSearch(this.state.searchTerm)}
        <ul className="list-items" onMouseLeave={this.unhovered}>
          {this.allPropsOrFiltered(this.state, this.props).map(listing => (
            <ListingIndexItem 
            listing={listing} 
            key={listing.id} 
            setHoveredListItem={this.setHoveredListItem}
            allReviews={this.props.allReviews}
            />
          ))}
        </ul >
        <div className="list-items-bottom-container">
          <div className="list-items-bottom-frame">
            <div className="list-items-bottom-text-main-container">
              <div className="list-items-bottom-text-main-frame">
                <div className="list-items-bottom-text-main-text">
                  1
                  <span> - </span>
                  {`${this.props.listings.length} `}
                  {`  of `}
                  {`${this.props.listings.length} places to stay`}
                </div>
              </div>
            </div>
            <div className="list-items-bottom-text-bottom-container">
              <div className="list-items-bottom-text-bottom-text">
                Additional fees apply. Taxes may be added.
              </div>
            </div>
          </div>
        </div>
        <div className="footer-buffer">footer</div>
      </div>
    )

    const hiddenShadow = (
      <div className="hidden-shadow">hello</div>
    )

    return (
      <div className="index-body">
          {hiddenShadow}
          <Navbar 
          searchTerm={this.state.searchTerm}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          guests={this.state.guests}
          />
          {listIndexItem}
          {sidenav}
      </div>
    );
  }
}
