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



const selectProduct = (unique) => {
  const item = document.querySelector(`#${unique}`);
  item.addEventListener("click", () => {
    const mapped = PRODUCTS.map((product) => {
      if (product.name.match(item.id)) {
        const itemName = JSON.stringify(product.name);
        const productStringify = JSON.stringify(product);
        localStorage.clear();
        localStorage.setItem(itemName, productStringify);
        return product;
      }
    }).filter((product) => product !== undefined);
    // renderDetails(mapped);
  });
};

const toggleFilter = () => {
  const clickArrow = document.querySelectorAll(".arrow");

  clickArrow.forEach((arrow) => {
    const showOnOffCollection = document.querySelector(".collection-check");
    const showOnOffColor = document.querySelector(".color-check");
    const showOnOffCategory = document.querySelector(".category-check");

    arrow.addEventListener("click", (e) => {
      if (e.target.classList.contains("down")) {
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
  const divForItem = document.createElement("div");
  divForItem.classList.add("item", `${product.name}`);
  // divForItem.id = `item_${i}`;
  divForItem.id = `${product.name}`;
  divForItem.innerHTML = `
      <a href="./preview.html">

    <div class="item-img">
    <img src="./img/image.1.png" alt="">
    </div>
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
    </a>

    </div>`;
  listOfItemsContainer.append(divForItem);
  selectProduct(product.name);
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
  const filteredProducts = PRODUCTS.filter((product) => {
    // return true or false
    if (product.price >= priceFrom && product.price <= priceTo) {
      return true;
    } else {
      return false;
    }
  })
    .filter((product) => {
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

  let itemArr = [];
  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    itemArr.push(item);
  }
  renderProducts(itemArr);
};

// setPagination(PRODUCTS, pagination, numberOfItems, currentPage)
const setPagination = (products, paginationWrapper, itemsPerPage) => {
  paginationWrapper.innerHTML = "";
  let pageCount = Math.ceil(products.length / itemsPerPage);
  for (let i = 1; i < pageCount + 1; i++) {
    let buttons = paginationButton(i, products);
    paginationWrapper.appendChild(buttons);
  }
};

const paginationButton = (page, products) => {
  let buttons = document.createElement("button");
  buttons.innerText = page;
  if (currentPage == page) {
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
  applyOption(e.target.value);
});

// pass into applyFilters when user select filters
filtersContainer.addEventListener("change", () => {
  const from = parseInt(priceRangeFromInput.value);
  const to = parseInt(priceRangeToInput.value);

  const selectedColors = [];
  const individualColorInputs = checkboxWithColor.querySelectorAll(
    "input:checked"
  );
  individualColorInputs.forEach((checkedColor) => {
    selectedColors.push(checkedColor.value);
  });

  const selectedCatagories = [];
  const individualCategoriesInputs = checkboxWithCategory.querySelectorAll(
    "input:checked"
  );
  individualCategoriesInputs.forEach((checkedCategories) => {
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
      const itemWrapper = document.querySelector(".item");
      console.log(itemWrapper);

      topCartButton.style.display = "block";
      counter += 1;
      topCartButton.innerText = counter;
    });
  });
};

// render each products
const renderProducts = (productsRender) => {
  listOfItemsContainer.innerText = "";
  productsRender.forEach((product, i) => {
    renderProduct(product, i);
  });
};

sortedColors();
renderCategories(sortedTypes);
displayList(PRODUCTS, listOfItemsContainer, numberOfItems, currentPage);
setPagination(PRODUCTS, pagination, numberOfItems, currentPage);
updateCart();
