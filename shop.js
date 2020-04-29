const checkboxWithColor = document.querySelector(".color-check");
const checkboxWithCategory = document.querySelector(".category-check");
const listOfItemsContainer = document.querySelector("#list-of-items");
const pagination = document.querySelector("#pagination");
const filtersContainer = document.querySelector(".filter-wrapper");
const priceRangeFromInput = filtersContainer.querySelector(
  "input[name='from']"
);
const priceRangeToInput = filtersContainer.querySelector("input[name='to']");
const sortOptionsDropdown = document.querySelector(".sort-options");
const sortOptions = sortOptionsDropdown.querySelectorAll("OPTION");

const sortedTypes = [...new Set(PRODUCTS.map((product) => product.type))];
// console.log(sortedTypes);

const toggleFilter = () => {
  const clickArrow = document.querySelectorAll(".arrow");

  clickArrow.forEach((arrow) => {
    const showOnOffCollection = document.querySelector(".collection-check");
    const showOnOffColor = document.querySelector(".color-check");
    const showOnOffCategory = document.querySelector(".category-check");

    arrow.addEventListener("click", (e) => {
      if (e.target.classList.contains("down")) {
        // console.log(e.target);
        e.target.classList.remove("down");
        arrow.style.transform = "rotate(-135deg)";
        arrow.style.transitionDuration = ".6s";
        if (e.target.classList.contains("collection-span")) {
          showOnOffCollection.style.display = "block";
        } else if (e.target.classList.contains("color-span")) {
          showOnOffColor.style.display = "block";
        } else if (e.target.classList.contains("category-span")) {
          showOnOffCategory.style.display = "block";
        }
      } else {
        e.target.classList.add("down");
        arrow.style.transform = "rotate(45deg)";
        arrow.style.transitionDuration = ".6s";
        if (e.target.classList.contains("collection-span")) {
          showOnOffCollection.style.display = "none";
        } else if (e.target.classList.contains("color-span")) {
          showOnOffColor.style.display = "none";
        } else if (e.target.classList.contains("category-span")) {
          showOnOffCategory.style.display = "none";
        }
      }
    });
  });
};

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
  });
};

priceSlider();

// render products, works either wth filter or nothing
const renderProduct = (product, i) => {
  // console.log(product);
  const divForItem = document.createElement("div");
  divForItem.classList.add("item");
  divForItem.id = `item_${i}`;
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
            <p class="item-price">£${product.price}</p>
            <button class="addToCart" type="submit"><img src="./img/Add to Cart Button.png" alt=""></button>
        </div>
        <!--price-submit-->
    </div>
    <!--item-details-->
    </div>`;
  listOfItemsContainer.append(divForItem);
};

let counter = 0;


// append each element with its color and value
const renderColors = (colors) => {
  colors.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("individualColor");

    const tickColors = document.createElement("input");
    tickColors.setAttribute("type", "checkbox");
    tickColors.id = color;
    tickColors.value = color;

    const colorName = document.createElement("label");
    colorName.htmlFor = color;
    colorName.classList.add("designedCheckbox");
    colorName.innerText = color;

    checkboxWithColor.appendChild(colorDiv); // append children on parent
    colorDiv.appendChild(tickColors); // append input[type=checkbox] to child(colorDiv)
    colorDiv.appendChild(colorName); // append input[type=checkbox] to child(colorDiv)
  });
};

const renderCategories = (selectedTypes) => {
  selectedTypes.forEach((selectedType) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("individualCategory");

    const tickCategory = document.createElement("input");
    tickCategory.setAttribute("type", "checkbox");
    tickCategory.id = selectedType;
    tickCategory.value = selectedType;

    const categoryName = document.createElement("label");
    categoryName.htmlFor = selectedType;
    categoryName.classList.add("designedCheckbox");
    categoryName.innerText = selectedType;

    checkboxWithCategory.appendChild(categoryDiv); // append children on parent
    categoryDiv.appendChild(tickCategory); // append input[type=checkbox] to child(categoryDiv)
    categoryDiv.appendChild(categoryName); // append label to child(categoryDiv)
  });
};

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
};

// filtering user preference price/items
const applyFilters = (priceFrom, priceTo, selectedColors, selectedTypes) => {
  // console.log("applied", priceFrom, priceTo, selectedColors, selectedTypes);
  const filteredProducts = PRODUCTS.filter((product) => {
    // return true or false
    if (product.price >= priceFrom && product.price <= priceTo) {
      return true;
    } else {
      return false;
    }
  })
    .filter((product) => {
      // console.log(product.colors);
      const colors = product.colors;
      // https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
      if (
        selectedColors.length == 0 ||
        colors.some((color) => selectedColors.includes(color))
      ) {
        return true;
      } else {
        return false;
      }
    })
    .filter((product) => {
      // console.log(product.type);
      const types = product.type;
      if (selectedTypes.length == 0 || selectedTypes.includes(types)) {
        return true;
      } else {
        return false;
      }
    });
  renderProducts(filteredProducts);
};

let currentPage = 1;
let numberOfItems = 6;
// displayList(PRODUCTS, listOfItemsContainer, numberOfItems, currentPage);
const displayList = (products, listOfItemsContainer, itemsPerPage, page) => {
  listOfItemsContainer.innerHTML = "";
  page--;
  let loopStart = itemsPerPage * page;
  const paginatedItems = products.slice(loopStart, loopStart + itemsPerPage);
  // console.log(paginatedItems);  // object array (6 items inside)
  // console.log(paginatedItems);
  let itemArr = [];
  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    itemArr.push(item);
    // console.log(item); // 6 individual items
    // console.log(`container${listOfItemsContainer}, perPage${itemsPerPage}, page${page}`);
  }
  renderProducts(itemArr);
};

// setPagination(PRODUCTS, pagination, numberOfItems, currentPage)
const setPagination = (products, paginationWrapper, itemsPerPage) => {
  // console.log(products);
  paginationWrapper.innerHTML = "";
  // console.log(paginationWrapper);
  let pageCount = Math.ceil(products.length / itemsPerPage);
  for (let i = 1; i < pageCount + 1; i++) {
    // console.log(pageCount); // 4 pages
    let buttons = paginationButton(i, products);
    paginationWrapper.appendChild(buttons);
  }
};

const paginationButton = (page, products) => {
  let buttons = document.createElement("button");
  buttons.innerText = page;
  if (currentPage == page) {
    // console.log(currentPage);
    // console.log(page);
    buttons.classList.add("active");
  }
  buttons.addEventListener("click", () => {
    currentPage = page;
    displayList(products, listOfItemsContainer, numberOfItems, currentPage);
    let currentButton = document.querySelector(".page-numbers button.active");
    currentButton.classList.remove("active");
    buttons.classList.add("active");
  });
  return buttons;
};

// sort by alphabet(best match),price high to low, price low to high
const applyOption = (sortOption) => {
  if (sortOption === "priceBestMatch") {
    PRODUCTS.sort((a, b) => {
      // sort by alphabet
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    // sort by lower price
  } else if (sortOption === "priceLower") {
    PRODUCTS.sort((a, b) => {
      return a.price - b.price;
    });
    //sort by higher price
  } else if (sortOption === "priceHigher") {
    PRODUCTS.sort((a, b) => {
      return b.price - a.price;
    });
  }
  return displayList(
    PRODUCTS,
    listOfItemsContainer,
    numberOfItems,
    currentPage
  );
};
sortOptionsDropdown.addEventListener("change", (e) => {
  // console.log("price dropdown was changed", e.target.value);
  applyOption(e.target.value);
});

// const productDetail = (product) => {

//     const individualItem = listOfItemsContainer.querySelectorAll(".item");
//     individualItem.forEach(item => {
//         console.log(item);

//         item.addEventListener("click", (e) => {
//             console.log(item);
//             console.log(PRODUCTS);
//             console.log(e.target);
//         })
//     })
// }

// pass into applyFilters when user select filters
filtersContainer.addEventListener("change", () => {
  const from = parseInt(priceRangeFromInput.value);
  const to = parseInt(priceRangeToInput.value);

  const selectedColors = [];
  const individualColorInputs = checkboxWithColor.querySelectorAll(
    "input:checked"
  );
  individualColorInputs.forEach((checkedColor) => {
    // console.log(checkedColor.value);
    selectedColors.push(checkedColor.value);
  });

  const selectedCatagories = [];
  const individualCategoriesInputs = checkboxWithCategory.querySelectorAll(
    "input:checked"
  );
  individualCategoriesInputs.forEach((checkedCategories) => {
    // console.log(checkedCategories.value);
    selectedCatagories.push(checkedCategories.value);
  });
  applyFilters(from, to, selectedColors, selectedCatagories);
});


// only first 5 items get this function :/
const updateCart = () => {
    const updatedCarts = document.querySelectorAll(".addToCart");
    updatedCarts.forEach((updatedCart) => {
        updatedCart.addEventListener("click", (e) => {
            const topCartButton = document.querySelector(".cartButtonSpan");
            const itemWrapper = document.querySelector(".item")
            console.log(itemWrapper);

            topCartButton.style.display = "block";
            counter += 1;
            topCartButton.innerText = counter;
            //   e.target.add("added");

        });
    });
};

// render each products
const renderProducts = (productsRender) => {
  // console.log(productsRender);
  listOfItemsContainer.innerText = "";
  productsRender.forEach((product, i) => {
    renderProduct(product, i);
  });
};

sortedColors();
// renderProducts(PRODUCTS);
renderCategories(sortedTypes);
displayList(PRODUCTS, listOfItemsContainer, numberOfItems, currentPage);
setPagination(PRODUCTS, pagination, numberOfItems, currentPage);
updateCart();
// productDetail(PRODUCTS);
