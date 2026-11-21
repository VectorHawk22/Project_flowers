// Атлас флоры Нижегородской области — 30 видов.
// Категории: forest — лес, meadow — луг, water — болото и водоёмы, urban — около жилья.
// months — месяцы цветения (4 = апрель … 9 = сентябрь).
// red — включён в Красную книгу Нижегородской области.

const PLANTS = [
  {
    id: "tussilago",
    name: "Мать-и-мачеха",
    latin: "Tussilago farfara",
    family: "Астровые (Сложноцветные)",
    category: "urban",
    months: [4, 5],
    height: "10–25 см",
    habitat: "Овраги, насыпи, пустыри, берега рек",
    description:
      "Зацветает одной из первых, ещё до появления листьев: цветочные побеги покрыты бурыми чешуями. Листья округлые, сверху гладкие и холодные, снизу войлочные и тёплые — отсюда и название. Лекарственное растение, сырьё для отхаркивающих средств.",
    features: ["Лекарственное", "Медонос"],
    photo: "images/tussilago.jpg"
  },
  {
    id: "calendula",
    name: "Календула лекарственная",
    latin: "Calendula officinalis",
    family: "Астровые (Сложноцветные)",
    category: "urban",
    months: [6, 7, 8, 9],
    height: "20–50 см",
    habitat: "Сады, клумбы, обочины, пустыри",
    description:
      "Культивируется как декоративное и лекарственное растение и легко дичает. Оранжевые корзинки закрываются на ночь. Настой цветков используют как противовоспалительное и ранозаживляющее средство.",
    features: ["Лекарственное", "Декоративное"],
    photo: "images/calendula.jpg"
  },
  {
    id: "convallaria",
    photo: "images/convallaria.jpg",
    name: "Ландыш майский",
    latin: "Convallaria majalis",
    family: "Спаржевые",
    category: "forest",
    months: [5, 6],
    height: "15–30 см",
    habitat: "Тенистые леса, овраги, парки",
    description:
      "Белые поникающие колокольчики с сильным ароматом, цветёт в мае — начале июня. Все части растения ядовиты, особенно красные ягоды. В ряде регионов сбор ограничен, поэтому лучше любоваться, а не рвать.",
    features: ["Ядовитое", "Лекарственное"]
  },
  {
    id: "trollius",
    photo: "images/trollius.jpg",
    name: "Купальница европейская",
    latin: "Trollius europaeus",
    family: "Лютиковые",
    category: "meadow",
    months: [5, 6],
    height: "30–80 см",
    habitat: "Сырые луга, опушки, лесные поляны",
    description:
      "Крупные шаровидные жёлтые цветки, похожие на бубенчики. Растение ядовито, рвать его нельзя.",
    features: ["Редкое", "Ядовитое"],
    red: true
  },
  {
    id: "anemone",
    photo: "images/anemone.jpg",
    name: "Ветреница дубравная",
    latin: "Anemonoides nemorosa",
    family: "Лютиковые",
    category: "forest",
    months: [4, 5],
    height: "10–25 см",
    habitat: "Широколиственные леса, дубравы, старые парки",
    description:
      "Один из первых весенних эфемероидов: цветёт до распускания листвы, а к середине лета надземная часть отмирает. Белые «лепестки» — на самом деле чашелистики.",
    features: ["Редкое"],
    red: true
  },
  {
    id: "pulmonaria",
    photo: "images/pulmonaria.jpg",
    name: "Медуница неясная",
    latin: "Pulmonaria obscura",
    family: "Бурачниковые",
    category: "forest",
    months: [4, 5],
    height: "15–30 см",
    habitat: "Широколиственные и смешанные леса",
    description:
      "Цветки меняют окраску от розовой к синей — так растение «подсказывает» опылителям, какие из них уже отцвели. Ранневесенний медонос, часто растёт куртинами.",
    features: ["Медонос", "Лекарственное"]
  },
  {
    id: "oxalis",
    photo: "images/oxalis.jpg",
    name: "Кислица обыкновенная",
    latin: "Oxalis acetosella",
    family: "Кисличные",
    category: "forest",
    months: [5, 6],
    height: "5–15 см",
    habitat: "Еловые и тенистые леса",
    description:
      "Тройчатые листья, похожие на клевер, с кислым вкусом из-за щавелевой кислоты. Белые цветки с розовыми жилками. Хороший индикатор старых тенистых ельников.",
    features: ["Съедобное"]
  },
  {
    id: "fragaria",
    photo: "images/fragaria.jpg",
    name: "Земляника лесная",
    latin: "Fragaria vesca",
    family: "Розовые",
    category: "forest",
    months: [5, 6, 7],
    height: "5–20 см",
    habitat: "Опушки, светлые леса, вырубки",
    description:
      "Белые цветки и ароматные красные плоды-многоорешки. Цветёт с мая, ягоды созревают в июне–июле. Листья заготавливают как витаминное сырьё.",
    features: ["Съедобное", "Лекарственное"]
  },
  {
    id: "myrtillus",
    photo: "images/myrtillus.jpg",
    name: "Черника",
    latin: "Vaccinium myrtillus",
    family: "Вересковые",
    category: "forest",
    months: [5, 6],
    height: "15–40 см",
    habitat: "Хвойные и смешанные леса",
    description:
      "Кустарничек с зелёными ребристыми побегами и чёрно-синими ягодами с сизым налётом. Ягоды и листья — лекарственное сырьё, а заросли черники — важный корм для лесных птиц и зверей.",
    features: ["Съедобное", "Лекарственное"]
  },
  {
    id: "vitis-idaea",
    photo: "images/vitis-idaea.jpg",
    name: "Брусника",
    latin: "Vaccinium vitis-idaea",
    family: "Вересковые",
    category: "forest",
    months: [5, 6],
    height: "10–25 см",
    habitat: "Сосняки, болота, сухие боровые склоны",
    description:
      "Вечнозелёный кустарничек с кожистыми листьями и красными ягодами, которые сохраняются под снегом. Кислые ягоды богаты бензойной кислотой и хорошо хранятся.",
    features: ["Съедобное", "Лекарственное"]
  },
  {
    id: "paris",
    photo: "images/paris.jpg",
    name: "Вороний глаз четырёхлистный",
    latin: "Paris quadrifolia",
    family: "Мелантиевые",
    category: "forest",
    months: [5, 6],
    height: "15–40 см",
    habitat: "Тенистые леса, ольшаники, овраги",
    description:
      "Четыре листа в мутовке и один синевато-чёрный плод в центре — вид легко узнать. Всё растение ядовито, есть его нельзя.",
    features: ["Ядовитое"]
  },
  {
    id: "trifolium",
    photo: "images/trifolium.jpg",
    name: "Клевер луговой",
    latin: "Trifolium pratense",
    family: "Бобовые",
    category: "meadow",
    months: [6, 7, 8],
    height: "20–50 см",
    habitat: "Луга, обочины, опушки",
    description:
      "Розово-пурпурные головки и тройчатые листья с белым рисунком. Важнейшая кормовая и медоносная культура, обогащает почву азотом благодаря клубеньковым бактериям.",
    features: ["Медонос", "Лекарственное"]
  },
  {
    id: "leucanthemum",
    photo: "images/leucanthemum.jpg",
    name: "Нивяник обыкновенный",
    latin: "Leucanthemum vulgare",
    family: "Астровые (Сложноцветные)",
    category: "meadow",
    months: [6, 7, 8],
    height: "30–80 см",
    habitat: "Луга, поляны, обочины",
    description:
      "Крупные белые корзинки с жёлтым центром — «настоящая ромашка» русских лугов. В отличие от аптечной ромашки, почти не пахнет и в медицине не используется.",
    features: ["Декоративное"]
  },
  {
    id: "achillea",
    photo: "images/achillea.jpg",
    name: "Тысячелистник обыкновенный",
    latin: "Achillea millefolium",
    family: "Астровые (Сложноцветные)",
    category: "meadow",
    months: [6, 7, 8, 9],
    height: "20–70 см",
    habitat: "Луга, обочины, пустыри",
    description:
      "Листья дважды-трижды рассечённые, «тысяча листьев». Белые или розоватые щитки цветков. Лекарственное и пряно-ароматическое растение, хороший медонос.",
    features: ["Лекарственное", "Медонос"]
  },
  {
    id: "hypericum",
    photo: "images/hypericum.jpg",
    name: "Зверобой продырявленный",
    latin: "Hypericum perforatum",
    family: "Зверобойные",
    category: "meadow",
    months: [6, 7, 8],
    height: "30–70 см",
    habitat: "Сухие луга, опушки, залежи",
    description:
      "Жёлтые цветки с чёрными точками, а листья кажутся «продырявленными» из-за просвечивающих желёзок. Одно из самых известных лекарственных растений средней полосы.",
    features: ["Лекарственное"]
  },
  {
    id: "origanum",
    photo: "images/origanum.jpg",
    name: "Душица обыкновенная",
    latin: "Origanum vulgare",
    family: "Яснотковые (Губоцветные)",
    category: "meadow",
    months: [7, 8],
    height: "30–80 см",
    habitat: "Опушки, сухие луга, остепнённые склоны",
    description:
      "Сильно пахнущая трава с розово-лиловыми щитками. Пряность и лекарственное растение; из-за активного сбора в некоторых местах области становится редкой.",
    features: ["Лекарственное", "Пряное"]
  },
  {
    id: "campanula",
    photo: "images/campanula.jpg",
    name: "Колокольчик раскидистый",
    latin: "Campanula patula",
    family: "Колокольчиковые",
    category: "meadow",
    months: [6, 7],
    height: "30–70 см",
    habitat: "Луга, опушки, лесные поляны",
    description:
      "Лилово-синие цветки-колокольчики на раскидистых веточках метёлки. Обычный луговой вид средней полосы, цветёт с июня.",
    features: ["Декоративное", "Медонос"]
  },
  {
    id: "dianthus",
    photo: "images/dianthus.jpg",
    name: "Гвоздика травянка",
    latin: "Dianthus deltoides",
    family: "Гвоздичные",
    category: "meadow",
    months: [6, 7, 8],
    height: "15–40 см",
    habitat: "Суходольные луга, опушки, склоны",
    description:
      "Мелкие розово-пурпурные цветки с зубчатыми лепестками, образует рыхлые дернинки. Любит сухие песчаные и известковые почвы.",
    features: ["Декоративное"]
  },
  {
    id: "ranunculus",
    photo: "images/ranunculus.jpg",
    name: "Лютик едкий",
    latin: "Ranunculus acris",
    family: "Лютиковые",
    category: "meadow",
    months: [5, 6, 7],
    height: "30–80 см",
    habitat: "Луга, поляны, пастбища",
    description:
      "Ярко-жёлтые цветки; сок едкий и раздражает кожу — отсюда название. В свежем виде ядовит для скота, но в сене опасность пропадает.",
    features: ["Ядовитое"]
  },
  {
    id: "chamaenerion",
    photo: "images/chamaenerion.jpg",
    name: "Иван-чай узколистный",
    latin: "Chamaenerion angustifolium",
    family: "Кипрейные",
    category: "meadow",
    months: [6, 7, 8],
    height: "50–150 см",
    habitat: "Вырубки, гари, опушки, насыпи",
    description:
      "Розово-пурпурные кисти на высоких стеблях, семена с пухом. Пионер зарастания вырубок и пожарищ. Из ферментированных листьев делают «копорский чай».",
    features: ["Съедобное", "Медонос"]
  },
  {
    id: "nymphaea",
    photo: "images/nymphaea.jpg",
    name: "Кувшинка белоснежная",
    latin: "Nymphaea candida",
    family: "Кувшинковые",
    category: "water",
    months: [6, 7, 8],
    height: "листья плавают на воде",
    habitat: "Стоячие и медленно текущие воды",
    description:
      "Крупные белые цветки раскрываются утром и закрываются к вечеру. Растёт на мелководье, часто образуя живописные куртины.",
    features: ["Редкое"],
    red: true
  },
  {
    id: "nuphar",
    photo: "images/nuphar.jpg",
    name: "Кубышка жёлтая",
    latin: "Nuphar lutea",
    family: "Кувшинковые",
    category: "water",
    months: [6, 7, 8],
    height: "листья плавают на воде",
    habitat: "Пруды, старицы, медленные реки",
    description:
      "Жёлтые чашевидные цветки приподняты над водой, листья с сердцевидной выемкой. Часто растёт вместе с кувшинкой, образуя живописные «острова».",
    features: ["Лекарственное"]
  },
  {
    id: "typha",
    photo: "images/typha.jpg",
    name: "Рогоз широколистный",
    latin: "Typha latifolia",
    family: "Рогозовые",
    category: "water",
    months: [6, 7],
    height: "150–250 см",
    habitat: "Болота, берега водоёмов, канавы",
    description:
      "Высокие стебли с бархатистыми коричневыми початками — то, что в быту называют «камышом». Корневища богаты крахмалом, молодые побеги съедобны.",
    features: ["Съедобное"]
  },
  {
    id: "iris",
    photo: "images/iris.jpg",
    name: "Ирис болотный",
    latin: "Iris pseudacorus",
    family: "Ирисовые",
    category: "water",
    months: [6, 7],
    height: "60–120 см",
    habitat: "Берега рек, сырые луга, мелководья",
    description:
      "Жёлтые цветки и мечевидные листья; часто образует густые заросли у воды. Корневище ядовито, поэтому использовать его в пищу нельзя.",
    features: ["Ядовитое", "Декоративное"]
  },
  {
    id: "menyanthes",
    photo: "images/menyanthes.jpg",
    name: "Вахта трёхлистная",
    latin: "Menyanthes trifoliata",
    family: "Вахтовые",
    category: "water",
    months: [5, 6],
    height: "15–30 см",
    habitat: "Низинные и переходные болота",
    description:
      "Тройчатые листья на длинных черешках и розовато-белые цветки с бахромой. Лекарственное растение, сырьё для горечей, улучшающих пищеварение.",
    features: ["Лекарственное"]
  },
  {
    id: "taraxacum",
    photo: "images/taraxacum.jpg",
    name: "Одуванчик лекарственный",
    latin: "Taraxacum officinale",
    family: "Астровые (Сложноцветные)",
    category: "urban",
    months: [4, 5, 6, 7, 8],
    height: "10–30 см",
    habitat: "Луга, газоны, пустыри, дворы",
    description:
      "Один из самых узнаваемых видов: цветёт почти всё лето, семена разлетаются с парашютиками. Молодые листья съедобны, корни используют в медицине.",
    features: ["Съедобное", "Лекарственное", "Медонос"]
  },
  {
    id: "plantago",
    photo: "images/plantago.jpg",
    name: "Подорожник большой",
    latin: "Plantago major",
    family: "Подорожниковые",
    category: "urban",
    months: [6, 7, 8, 9],
    height: "10–30 см",
    habitat: "Тропы, газоны, обочины, дворы",
    description:
      "Розетка широких листьев с дуговым жилкованием и колосовидное соцветие. Классическое ранозаживляющее средство, знакомое каждому с детства.",
    features: ["Лекарственное"]
  },
  {
    id: "chelidonium",
    photo: "images/chelidonium.jpg",
    name: "Чистотел большой",
    latin: "Chelidonium majus",
    family: "Маковые",
    category: "urban",
    months: [5, 6, 7, 8],
    height: "30–80 см",
    habitat: "Тенистые места, сады, развалины",
    description:
      "Жёлтые цветки и оранжевый млечный сок, которым в народе прижигают бородавки. Сок ядовит и сильно раздражает кожу и слизистые.",
    features: ["Ядовитое", "Лекарственное"]
  },
  {
    id: "tanacetum",
    photo: "images/tanacetum.jpg",
    name: "Пижма обыкновенная",
    latin: "Tanacetum vulgare",
    family: "Астровые (Сложноцветные)",
    category: "urban",
    months: [7, 8, 9],
    height: "60–120 см",
    habitat: "Обочины, пустыри, железнодорожные насыпи",
    description:
      "Плотные жёлтые «пуговки» корзинок и резкий камфорный запах. Пряно-лекарственное растение, но в больших дозах ядовита.",
    features: ["Лекарственное", "Ядовитое"]
  },
  {
    id: "matricaria",
    photo: "images/matricaria.jpg",
    name: "Ромашка аптечная",
    latin: "Matricaria chamomilla",
    family: "Астровые (Сложноцветные)",
    category: "urban",
    months: [5, 6, 7, 8],
    height: "15–40 см",
    habitat: "Пустыри, посевы, обочины",
    description:
      "Отличается от нивяника полым цветоложем и сильным ароматом. Одно из самых популярных лекарственных растений, хороший медонос.",
    features: ["Лекарственное", "Медонос"]
  }
];
