const red = document.querySelector(".red");

let counter = 0;

const showSubDetails = () => {
  const detailToggle = document.querySelector(".detail-toggle");
  detailToggle.addEventListener("click", () => {
    const toggleNone = document.querySelector(".toggleNone");
    if (toggleNone) {
      toggleNone.classList.remove("toggleNone");
    }else {
        const previewToggleDetails = document.querySelector(".preview-toggle-details")
        previewToggleDetails.classList.add("toggleNone");
    }
  });
};

const addToBasket = () => {
  const addButton = document.querySelector(".add-to-basket");
  addButton.addEventListener("click", () => {
    const topCartButton = document.querySelector(".cartButtonSpan");
    const itemWrapper = document.querySelector(".item");
    console.log(itemWrapper);

    topCartButton.style.display = "block";
    counter += 1;
    topCartButton.innerText = counter;
  });
};

const renderPreview = (previewDetail) => {
  const preview = previewDetail[0];
  const previewDescription = document.createElement("div");
  previewDescription.classList.add("preview-description");
  previewDescription.innerHTML = `
    
              <div class="img-pre">
                <div class="preview-img">
                  <img src="./img/preview.top.png" alt="" />
                </div>

                <div class="slides">
                  <div class="slide-img">
                    <div class="preview-img-one">
                      <img src="./img/preview.one.png" alt="" />
                    </div>
                    <div class="preview-img-two">
                      <img src="./img/preview.two.png" alt="" />
                    </div>
                    <div class="preview-img-three">
                      <img src="./img/preview.three.png" alt="" />
                    </div>
                    <div class="preview-img-four">
                      <img src="./img/preview.four.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="preview-item-details">
                <div class="no-name">
                  <p class="preview-item-name"><strong>${preview.name}</strong></p>
                  <p class="preview-item-tagline">
                    ${preview.description}
                  </p>
                </div>
                <!-- no-name-->
                <div class="preview-price-stock">
                  <p class="preview-price">£${preview.price}</p>
                  <p class="preview-stock">
                    dispatch in 2-3 weeks: <span>only 4 left</span>
                  </p>
                </div>
                <!-- preview-price-stock -->
                <div class="preview-color">
                  <p class="color-radio ${preview.colors[0]}"></p>
                  <p class="color-radio ${preview.colors[1]}"></p>
                  <p class="color-radio ${preview.colors[2]}"></p>
                </div>
                <!-- preview-color-->
                <div class="btns">
                  <div class="add-to-basket">
                    <p>ADD TO BASKET</p>
                  </div>
                  <!--add-to-basket-->
                  <div class="detail-toggle">
                    <p>DETAILS<span class="arrow"></span></p>
                  </div>
                  <!--detail-toggle-->
                </div>
                <!--btns-->

                <div class="preview-toggle-details toggleNone">
                  <ul>
                    <li class="dimensions">- w:${preview.dimensions.w}, h:${preview.dimensions.h}, d:${preview.dimensions.d}</li>
                    <li class="seat-dimensions">- w:${preview.seat_dimensions.w}, h:${preview.seat_dimensions.h}, d:${preview.seat_dimensions.d}</li>
                    <li class="weight">- ${preview.weight}</li>
                    <li class="material">- ${preview.materials[0]}</li>
                    <li class="filling-material">- ${preview.filling_materials[0]}</li>
                    <li class="comfort-level">- ${preview.comfort_level}</li>
                  </ul>
                </div>
                <!--preview-toggle-details-->
              </div>
              <!--preview-item-details-->
    
    `;

  red.append(previewDescription);
  addToBasket();
  showSubDetails();
};

const getProductForPreview = () => {
  const previewDetails = PRODUCTS.map((product) => {
    const itemName = JSON.stringify(product.name);
    const getDetails = JSON.parse(localStorage.getItem(itemName));
    if (getDetails !== null) {
      return getDetails;
    }
  }).filter((product) => product !== undefined);
  console.log(previewDetails);
  renderPreview(previewDetails);
};

getProductForPreview();
