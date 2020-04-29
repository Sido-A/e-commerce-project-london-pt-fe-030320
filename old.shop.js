/**
 <main class="list-of-items">
<!--item--><div class="item">
    <div class="item-img"><img src="./img/druid.png" alt=""></div>
    <div class="item-details">
        <div class="name-type">
            <p class="item-name">LOL</p>
            <p class="item-type">Bed</p>
        </div>
        <!--name-type-->
        <div class="price-submit">
            <p class="item-price">200000</p>
            <button class="addToCart" type="submit"><img src="./img/Add to Cart Button.png" alt=""></button>
        </div>
        <!--price-submit-->
    </div>
    <!--item-details-->
</div>
<!--item--> 
</main>
 */
const checkboxWithColor = document.querySelector(".color-check");
const checkboxWithCategory = document.querySelector(".category-check");
const listOfItems = document.querySelector(".list-of-items");
const filtersContainer = document.querySelector(".filter-wrapper");
const priceRangeFromInput = filtersContainer.querySelector("input[name='from']");
const priceRangeToInput = filtersContainer.querySelector("input[name='to']");



const maxPrice = [...PRODUCTS].sort((a, b)=> b.price - a.price)[0].price;
// console.log(maxPrice);



// main item window
const eachItemsDisplay = (items) => {
  items.forEach((item, i) => {
    const divForItem = document.createElement("div");
    divForItem.classList.add("item");
    // console.log(i);
    if (i < 6) {
        divForItem.innerHTML = `
    <div class="item-img"><img src="./img/image.1.png" alt=""></div>
    <div class="item-details">
        <div class="name-type">
            <p class="item-name">${item.name}</p>
            <p class="item-type">${item.type}</p>
        </div>
        <!--name-type-->
        <div class="price-submit">
            <p class="item-price">${item.price}</p>
            <button class="addToCart" type="submit"><img src="./img/Add to Cart Button.png" alt=""></button>
        </div>
        <!--price-submit-->
    </div>
    <!--item-details-->
    </div>`;
        listOfItems.appendChild(divForItem);        
    } else if (i >= 6 && i < 12){
        const nextPages = document.querySelector(".next-page");
        const pageNumbers = nextPages.querySelectorAll(".page-number");

        for (let i = 0; i < pageNumbers.length; i++) {
            let pageNumber = pageNumbers[i];
            pageNumber.id = (`page${i+1}`)
            // console.log(pageNumber, i);
            nextPages.addEventListener("click", e => {
                // console.log(e.target);
                if (e.target === pageNumber) {
                    console.log("HI");       
                    
                    
                }
            })
        }
    }
    });
};

eachItemsDisplay(PRODUCTS);

// append each element with its color and value
const eachColor = (colors)=> {
    for (const color of colors) {
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
        colorDiv.appendChild(colorName); // append label to child(colorDiv)    
    }

    ticked();
}

const eachCategory = (types)=>{
    types.forEach(type => {

        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("individualCategory")

        const tickCategory = document.createElement("input");
        tickCategory.setAttribute("type", "checkbox");
        tickCategory.id = type;
        tickCategory.value = type;

        const categoryName = document.createElement("label");
        categoryName.htmlFor = type;
        categoryName.classList.add("designedCheckbox")
        categoryName.innerText = type;

        checkboxWithCategory.appendChild(categoryDiv); // append children on parent
        categoryDiv.appendChild(tickCategory); // append input[type=checkbox] to child(categoryDiv)
        categoryDiv.appendChild(categoryName); // append label to child(categoryDiv)    
    });

}

const applyFilters = (sortedColors,selectedColors)=> {
    // console.log(sortedColors);
    
        console.log("sorted: "+sortedColors);
        console.log("selected: "+selectedColors);
        const sorted = sortedColors.forEach(sortedColor => sortedColor(selectedColors));
        console.log("yo"+ sorted);
        
        if (selectedColors.includes(sorted)) {            
            console.log("MATCHED");
        }
        

    
    /**
    // const filteredProducts = PRODUCTS.filter(product =>{
    //     if (product.price >= minPrice && product.price <= maxPrice) {
    //         return true            
    //     }else{
    //         return false
    //     }
    // }).filter(sortedColors => {

    // })
    // eachItemsDisplay(selectedColors)
         */

} 

// // get the element that got ticked
const ticked = (sortedNewColorsArr)=> {
    // const tickTheBox = document.querySelectorAll(".designedCheckbox");
    const inputCheckbox = document.querySelectorAll("[type='checkbox']");    
    const selectedColorsArr = [];    
    
    for (let i = 0; i < inputCheckbox.length; i++) {
        const element = inputCheckbox[i];
        // console.log(element); // 18
        
        element.addEventListener("click",(e)=> {
            if (element.checked === true) {
                // console.log(element.value);                
                selectedColorsArr.push(element.value) 
            } else {
                console.log("by");                
            }     
            // console.log(selectedColorsArr);
            applyFilters(sortedNewColorsArr, selectedColorsArr);     
        })   
    }
}


// sorting duplicated colors
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
    eachColor(sortedNewColorsArr);
    ticked(sortedNewColorsArr)
}
sortedColors();

const sortedCategory = ()=> {
    const sortedTypes = PRODUCTS.map(product => product.type);
    const newTypeArr = new Set(sortedTypes);
    eachCategory(newTypeArr);    
}
sortedCategory();


const toggleFilter = ()=>{
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
                } else if (e.target.classList.contains("color-span")){
                    showOnOffColor.style.display = "block"
                } else if(e.target.classList.contains("category-span")){
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

const sliderDrag = ()=> {
    const slideContainer = document.querySelector(".slideContainer");
    const sliderMin = slideContainer.querySelector(".sliderMin");
    const sliderMax = slideContainer.querySelector(".sliderMax");
    slideContainer.addEventListener("input", ()=>{
        const min = slideContainer.querySelector(".min");
        const max = slideContainer.querySelector(".max");
        min.innerHTML = sliderMin.value;
        max.innerHTML = sliderMax.value;
    })    
}

sliderDrag();


filtersContainer.addEventListener("change", e => {
    // console.log(e.target.value);
    const from = parseInt(priceRangeFromInput.value)
    const to = parseInt(priceRangeToInput.value)      
    // console.log(typeof from, typeof to);
    
    const filteredProducts = PRODUCTS.filter(product => {
        // return true or false
        if (product.price >= from && product.price <= to) {            
            return true;             
        } else {
            return false;
        }

    })
    
    console.log(filteredProducts);
    

})

