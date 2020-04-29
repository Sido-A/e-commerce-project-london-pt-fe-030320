const checkboxWithColor = document.querySelector(".color-check");
const checkboxWithCategory = document.querySelector(".category-check");
const listOfItemsContainer = document.querySelector("#list-of-items");
const listOfItemsWrapper = document.getElementsByClassName(".list-of-items");
const filtersContainer = document.querySelector(".filter-wrapper");
const priceRangeFromInput = filtersContainer.querySelector("input[name='from']");
const priceRangeToInput = filtersContainer.querySelector("input[name='to']");
const sortedTypes = [...new Set(PRODUCTS.map(product => product.type))];
// console.log(sortedTypes);
console.log(listOfItemsContainer);

let currentPage = 1;
let numberOfItems = 6;

const displayList = (items, wrapper,itemsPerPage, page)=> {        
    wrapper.innerHTML = "";
    page--;
    let loopStart = itemsPerPage * page;
    const paginatedItems = items.slice(loopStart, loopStart + itemsPerPage)
    // console.log(paginatedItems);       
    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i]
        // console.log(item); // 6 items 
        renderProduct(items)
 
    }
}


const setPagination = (items, wrapper, itemsPerPage) =>{    
    wrapper.innerHTML = "";
    let pageCount = Math.ceil(items.length / itemsPerPage);
    // console.log(pageCount); // 4 pages    
    for (let i = 1; i < pageCount + 1; i++) {
        let buttons = paginationButton(i);
        listOfItemsContainer.appendChild(buttons);

      
    }
}

const paginationButton = (page)=>{
    let button = document.createElement("button")
    button.innerText = page;
    if (currentPage == page){
        button.classList.add("active")
    }

}




const toggleFilter = () => {
    const clickArrow = document.querySelectorAll(".arrow")

    clickArrow.forEach(arrow => {
        const showOnOffCollection = document.querySelector(".collection-check");
        const showOnOffColor = document.querySelector(".color-check");
        const showOnOffCategory = document.querySelector(".category-check");

        arrow.addEventListener("click", (e) => {
            if (e.target.classList.contains("down")) {
                // console.log(e.target);
                e.target.classList.remove("down")
                arrow.style.transform = "rotate(-135deg)"
                arrow.style.transitionDuration = ".6s"
                if (e.target.classList.contains("collection-span")) {
                    showOnOffCollection.style.display = "block"
                } else if (e.target.classList.contains("color-span")) {
                    showOnOffColor.style.display = "block"
                } else if (e.target.classList.contains("category-span")) {
                    showOnOffCategory.style.display = "block"
                }

            } else {
                e.target.classList.add("down")
                arrow.style.transform = "rotate(45deg)"
                arrow.style.transitionDuration = ".6s"
                if (e.target.classList.contains("collection-span")) {
                    showOnOffCollection.style.display = "none"
                } else if (e.target.classList.contains("color-span")) {
                    showOnOffColor.style.display = "none"
                } else if (e.target.classList.contains("category-span")) {
                    showOnOffCategory.style.display = "none"
                }
            }
        })

    });
}  

toggleFilter();

// price slider
const priceSlider = () => {
    const slideContainer = document.querySelector(".slideContainer");
    const sliderMin = slideContainer.querySelector(".sliderMin");
    const sliderMax = slideContainer.querySelector(".sliderMax");
    slideContainer.addEventListener("input", () => {
        const min = slideContainer.querySelector(".min");
        const max = slideContainer.querySelector(".max");
        min.innerHTML = `£${sliderMin.value}`;
        max.innerHTML = `£${sliderMax.value}`;
    })
}

priceSlider();

// render products, works either wth filter or nothing
const renderProduct = product => {
    const divForItem = document.createElement("div");
    divForItem.classList.add("item");
    // console.log(i);
        divForItem.innerHTML = `
    <div class="item-img"><img src="./img/image.1.png" alt=""></div>
    <div class="item-details">
        <div class="name-type">
            <p class="item-name">${product.name}</p>
            <p class="item-type">${product.type}</p>
        </div>
        <!--name-type-->
        <div class="price-submit">
            <p class="item-price">${product.price}</p>
            <button class="addToCart" type="submit"><img src="./img/Add to Cart Button.png" alt=""></button>
        </div>
        <!--price-submit-->
    </div>
    <!--item-details-->
    </div>`;
    listOfItemsContainer.append(divForItem);
    
}



// append each element with its color and value
const renderColors = (colors) => {
    colors.forEach(color =>{
        const colorDiv = document.createElement("div");
        colorDiv.classList.add("individualColor")

        const tickColors = document.createElement("input");
        tickColors.setAttribute("type", "checkbox");
        tickColors.id = color;
        tickColors.value = color;

        const colorName = document.createElement("label");
        colorName.htmlFor = color;
        colorName.classList.add("designedCheckbox")
        colorName.innerText = color;

        checkboxWithColor.appendChild(colorDiv); // append children on parent
        colorDiv.appendChild(tickColors); // append input[type=checkbox] to child(colorDiv)
        colorDiv.appendChild(colorName); // append input[type=checkbox] to child(colorDiv)
    })
        
}

const renderCategories = (selectedTypes) => {
    selectedTypes.forEach(selectedType => {

        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("individualCategory")

        const tickCategory = document.createElement("input");
        tickCategory.setAttribute("type", "checkbox");
        tickCategory.id = selectedType;
        tickCategory.value = selectedType;

        const categoryName = document.createElement("label");
        categoryName.htmlFor = selectedType;
        categoryName.classList.add("designedCheckbox")
        categoryName.innerText = selectedType;

        checkboxWithCategory.appendChild(categoryDiv); // append children on parent
        categoryDiv.appendChild(tickCategory); // append input[type=checkbox] to child(categoryDiv)
        categoryDiv.appendChild(categoryName); // append label to child(categoryDiv)    
    });
}

// for check box colors
const sortedColors = () => {
    const newColorArr = [];
    for (let i = 0; i < PRODUCTS.length; i++) {
        const element = PRODUCTS[i];
        // console.log(element.colors);
        const eachColors = element.colors;
        for (let j = 0; j < eachColors.length; j++) {
            const el = eachColors[j];
            newColorArr.push(el);
        }
    }
    const sortedNewColorsArr = [...new Set(newColorArr)];
    renderColors(sortedNewColorsArr);
}

sortedColors();

// filtering user preference price/items
const applyFilters = (priceFrom, priceTo, selectedColors, selectedTypes) => {
    // console.log("applied", priceFrom, priceTo, selectedColors, selectedTypes);    
    const filteredProducts = PRODUCTS.filter(product => {
        // return true or false
        if (product.price >= priceFrom && product.price <= priceTo) {
            return true;
        } else {
            return false;
        }
    }).filter(product =>{
        // console.log(product.colors);
        const colors = product.colors;   
        // https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
        if (selectedColors.length == 0 ||  colors.some(color => selectedColors.includes(color))) {
            return true;            
        } else {
            return false;
        }
    }).filter(product => {
        // console.log(product.type);
        const types = product.type
        if (selectedTypes.length == 0 || selectedTypes.includes(types)) {
            return true;            
        } else {
            return false;
        }
    })
    renderProducts(filteredProducts);
}

// pass into applyFilters when user select filters
filtersContainer.addEventListener("change", () => {

    const from = parseInt(priceRangeFromInput.value);
    const to = parseInt(priceRangeToInput.value);

    const selectedColors = [];
    const individualColorInputs = checkboxWithColor.querySelectorAll("input:checked")
    individualColorInputs.forEach(checkedColor => {
        // console.log(checkedColor.value);        
        selectedColors.push(checkedColor.value)
    })

    const selectedCatagories = [];
    const individualCategoriesInputs = checkboxWithCategory.querySelectorAll("input:checked")
    individualCategoriesInputs.forEach(checkedCategories => {
        // console.log(checkedCategories.value);
        selectedCatagories.push(checkedCategories.value)
    })
    applyFilters(from, to, selectedColors, selectedCatagories);
}) 

const renderProducts = productsRender => {
    listOfItemsContainer.innerText = "";
    productsRender.forEach(product => {
        renderProduct(product);
    })
}



renderProducts(PRODUCTS);
renderCategories(sortedTypes);
displayList(PRODUCTS, listOfItemsContainer, numberOfItems, currentPage);
setPagination(PRODUCTS, listOfItemsContainer, numberOfItems, currentPage)

