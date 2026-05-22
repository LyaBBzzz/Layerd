export const products = [
  {
    id: 1,
    brand: "NEW BALANCE", category: "shoes", subCategory: "sneakers",
    name: {
      en: "550 Classic Sneakers",
      ru: "Кроссовки 550 Classic"
    },
    price: 130,
    availableSizes: [40, 41, 42],
    description: {
      en: "The original 550 debuted in 1989 and made its mark on basketball courts from coast to coast. After its initial run, the 550 was filed away in the archives, before being reintroduced.",
      ru: "Оригинальная модель 550 дебютировала в 1989 году и оставила свой след на баскетбольных площадках от побережья до побережья. После первого выпуска модель была отправлена в архивы, а затем переиздана."
    },
    colors: [
      { 
        name: "Beige", 
        colorCode: "#e3dac9", 
        image: "/images/shoes/sneakers/gallery_sneackers/1sneakers.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/1sneakers_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/1sneakers_2view.png"
        ]
      },
      { 
        name: "Green", 
        colorCode: "#22c55e", 
        image: "/images/shoes/sneakers/gallery_sneackers/1sneacker_green.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/1sneacker_green_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/1sneacker_green_2view.png"
        ]
      },
      { 
        name: "Purple", 
        colorCode: "#a855f7", 
        image: "/images/shoes/sneakers/gallery_sneackers/1sneacker_purple.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/1sneacker_purple_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/1sneacker_purple_2view.png"
        ]
      }
    ]
  },
  {
    id: 2,
    brand: "NIKE", category: "shoes", subCategory: "sneakers",
    name: {
      en: "Air Max 90",
      ru: "Кроссовки Air Max 90"
    },
    price: 150,
    availableSizes: [42, 43, 44],
    description: {
      en: "Lace up and feel the legacy. Produced at the intersection of art, music and culture, this champion running shoe helped define the '90s.",
      ru: "Зашнуруйте и почувствуйте наследие. Эта чемпионская беговая обувь, созданная на стыке искусства, музыки и культуры, во многом определила стиль 90-х."
    },
    colors: [
      { 
        name: "Beige", 
        colorCode: "#e3dac9", 
        image: "/images/shoes/sneakers/gallery_sneackers/2sneakers.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/2sneakers_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/2sneakers_2view.png"
        ]
      },
      { 
        name: "Blue", 
        colorCode: "#3b82f6", 
        image: "/images/shoes/sneakers/gallery_sneackers/2sneakers_blue.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/2sneakers_blue_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/2sneakers_blue_2view.png"
        ]
      },
      { 
        name: "Gray", 
        colorCode: "#9ca3af", 
        image: "/images/shoes/sneakers/gallery_sneackers/2sneakers_gray.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/2sneakers_gray_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/2sneakers_gray_2view.png"
        ]
      }
    ]
  },
  {
    id: 3,
    brand: "NIKE", category: "shoes", subCategory: "sneakers",
    name: {
      en: "Air Force 1 '07",
      ru: "Кроссовки Air Force 1 '07"
    },
    price: 110,
    availableSizes: [40, 43, 45],
    description: {
      en: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best.",
      ru: "Сияние продолжает жить в Nike Air Force 1 '07 — баскетбольной иконе, по-новому раскрывающей то, что вы знаете лучше всего."
    },
    colors: [
      { 
        name: "Purple", 
        colorCode: "#8b5cf6", 
        image: "/images/shoes/sneakers/gallery_sneackers/3sneakers.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/3sneakers_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/3sneakers_2view.png"
        ]
      },
      { 
        name: "Blue", 
        colorCode: "#3b82f6", 
        image: "/images/shoes/sneakers/gallery_sneackers/3sneakers_blue.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/3sneakers_blue_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/3sneakers_blue_2view.png"
        ]
      },
      { 
        name: "Red", 
        colorCode: "#ef4444", 
        image: "/images/shoes/sneakers/gallery_sneackers/3sneakers_red.png",
        additionalImages: [
          "/images/shoes/sneakers/gallery_sneackers/3sneakers_red_1view.png",
          "/images/shoes/sneakers/gallery_sneackers/3sneakers_red_2view.png"
        ]
      }
    ]
  },
  {
    id: 4,
    brand: "NEW BALANCE", category: "shoes", subCategory: "sneakers",
    name: {
      en: "9060 Sneakers",
      ru: "Кроссовки 9060"
    },
    price: 150,
    listOnly: true,
    availableSizes: [40, 41, 42, 43],
    description: {
      en: "A modern homage to running shoes, the B30 sneaker combines elegance with a sporty silhouette, crafted from premium mesh and technical fabric.",
      ru: "Современная дань беговым кроссовкам, модель B30 сочетает элегантность со спортивным силуэтом, выполненная из первоклассной сетки и технической ткани."
    },
    colors: [
      {
        name: "Brown",
        colorCode: "#8B5A2B",
        image: "/images/shoes/sneakers/ListView_sneackers/4Sneackers.png",
        outOfStock: true,
        additionalImages: [
          "/images/shoes/sneakers/ListView_sneackers/4Sneackers_1view.png",
          "/images/shoes/sneakers/ListView_sneackers/4Sneackers_2view.png"
        ]
      },
      {
        name: "Green",
        colorCode: "#22c55e",
        image: "/images/shoes/sneakers/ListView_sneackers/4Sneackers_green.png",
        additionalImages: [
          "/images/shoes/sneakers/ListView_sneackers/4Sneackers_green_1view.png",
          "/images/shoes/sneakers/ListView_sneackers/4Sneackers_green_2view.png"
        ]
      }
    ]
  },
  {
    id: 5,
    brand: "CARHARTT", category: "clothing", subCategory: "jackets",
    name: {
      en: "Detroit Jacket",
      ru: "Куртка Detroit"
    },
    price: 250,
    availableSizes: [48, 50, 52],
    description: {
      en: "Classic Detroit jacket crafted from tough organic cotton canvas. Features a corduroy collar, boxy fit, and gold-tone zip closure.",
      ru: "Классическая куртка Detroit из плотного органического хлопкового канваса. Отличается вельветовым воротником, квадратным кроем и застежкой-молнией золотистого цвета."
    },
    colors: [
      {
        name: "Brown",
        colorCode: "#8B5A2B",
        image: "/images/clothing/jackets/gallery_jackets/1jacket.png",
        additionalImages: [
          "/images/clothing/jackets/gallery_jackets/1jacket_1view.png",
          "/images/clothing/jackets/gallery_jackets/1jacket_2view.png"
        ]
      }
    ]
  },
  {
    id: 6,
    brand: "BURBERRY", category: "clothing", subCategory: "jackets",
    name: {
      en: "Kensington Trench Coat",
      ru: "Тренчкот Kensington"
    },
    price: 2200,
    availableSizes: [46, 48, 50, 52],
    description: {
      en: "The classic trench coat, updated with modern proportions. Crafted in England from bespoke gabardine with Vintage check lining.",
      ru: "Классический тренчкот, обновленный с современными пропорциями. Создан в Англии из габардина на заказ с подкладкой в клетку Vintage check."
    },
    colors: [
      {
        name: "Black",
        colorCode: "#000000",
        image: "/images/clothing/jackets/gallery_jackets/2jacket.png",
        additionalImages: [
          "/images/clothing/jackets/gallery_jackets/2jacket_1view.png",
          "/images/clothing/jackets/gallery_jackets/2jacket_2view.png"
        ]
      }
    ]
  },
  {
    id: 7,
    brand: "STONE ISLAND", category: "clothing", subCategory: "jackets",
    name: {
      en: "Nylon Metal Overshirt",
      ru: "Нейлоновая рубашка-куртка"
    },
    price: 650,
    availableSizes: [48, 50, 52, 54],
    description: {
      en: "Overshirt in Nylon Metal, an iconic material from the brand, with a distinctive metallic and iridescent appearance.",
      ru: "Рубашка-куртка из Nylon Metal, культового материала бренда, с характерным металлическим и переливающимся внешним видом."
    },
    colors: [
      {
        name: "Black",
        colorCode: "#000000",
        image: "/images/clothing/jackets/gallery_jackets/3jacket.png",
        additionalImages: [
          "/images/clothing/jackets/gallery_jackets/3jacket_1view.png",
          "/images/clothing/jackets/gallery_jackets/3jacket_2view.png"
        ]
      }
    ]
  },
  {
    id: 8,
    brand: "BALENCIAGA", category: "shoes", subCategory: "sneakers",
    name: {
      en: "Track Sneakers",
      ru: "Кроссовки Track"
    },
    price: 1050,
    listOnly: true,
    availableSizes: [40, 42, 44],
    description: {
      en: "Balenciaga Track Sneakers in multi-materials. Highly complex layered design.",
      ru: "Кроссовки Balenciaga Track из различных материалов. Очень сложный многослойный дизайн."
    },
    colors: [
      { 
        name: "Blue", 
        colorCode: "#3b82f6", 
        image: "/images/shoes/sneakers/ListView_sneackers/5sneackers.png",
        additionalImages: [
          "/images/shoes/sneakers/ListView_sneackers/5sneackers_1view.png",
          "/images/shoes/sneakers/ListView_sneackers/5sneackers_2view.png"
        ]
      }
    ]
  },
  {
    id: 9,
    brand: "PRADA", category: "shoes", subCategory: "sneakers",
    name: {
      en: "Cloudbust Thunder",
      ru: "Кроссовки Cloudbust Thunder"
    },
    price: 980,
    listOnly: true,
    availableSizes: [41, 42, 43],
    description: {
      en: "Futuristic sneakers with a sculptural rubber sole.",
      ru: "Футуристичные кроссовки со скульптурной резиновой подошвой."
    },
    colors: [
      { 
        name: "Black", 
        colorCode: "#222222", 
        image: "/images/shoes/sneakers/ListView_sneackers/6sneackers.png",
        additionalImages: [
          "/images/shoes/sneakers/ListView_sneackers/6sneackers_1view.png",
          "/images/shoes/sneakers/ListView_sneackers/6sneackers_2view.png"
        ]
      }
    ]
  },
  {
    id: 10,
    brand: "SAINT LAURENT", category: "shoes", subCategory: "sneakers",
    name: {
      en: "Andy Sneakers",
      ru: "Кеды Andy"
    },
    price: 650,
    listOnly: true,
    availableSizes: [39, 40, 41, 42],
    description: {
      en: "Low-top sneakers crafted in smooth calfskin.",
      ru: "Низкие кеды из гладкой телячьей кожи."
    },
    colors: [
      { 
        name: "White", 
        colorCode: "#ffffff", 
        image: "/images/shoes/sneakers/ListView_sneackers/7sneackers.png",
        additionalImages: [
          "/images/shoes/sneakers/ListView_sneackers/7sneackers_1view.png",
          "/images/shoes/sneakers/ListView_sneackers/7sneackers_2view.png"
        ]
      }
    ]
  }
];
