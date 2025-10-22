import React, { useState } from "react";
import {
  Carousel,
  Container,
  Row,
  Col,
  Button,
  Image,
  ListGroup,
  Form,
} from "react-bootstrap";


const lessonGroups = [
  // جلمات صبحانه
    {
    title: " صُبحانِه ",
    imgSide:`${process.env.PUBLIC_URL}/images/assetWord/designPage/girlSitting.png`,
    slides: [
        {
        sentence: "مَن صُبحانِه خوردَم.",
        words: [
            { text: "صُبحانِه", pronunciation: "sobhāne", image: "https://cdn.vectorstock.com/i/1000v/83/83/delicious-tasty-breakfast-cartoon-vector-24468383.jpg", translation: "Breakfast" },
        ]
        },
        {
        sentence: "مَن نان و پَنیر دوست دارَم.",
        words: [
            { text: "نان", pronunciation: "nān", image: "https://cdn.vectorstock.com/i/1000v/53/07/thanksgiving-baked-bread-cartoon-colored-clipart-vector-43185307.jpg", translation: "Bread" },
            { text: "پَنیر", pronunciation: "panir", image: "https://img.freepik.com/premium-vector/cartoon-drawing-cheese-with-face-it_602454-7870.jpg", translation: "Cheese" },
        ]
        },
        {
        sentence: "صُبحانِه‌اَم شیر و عَسَل بود.",
        words: [
            { text: "صُبحانِه‌", pronunciation: "sobhāne'am", image: "https://cdn.vectorstock.com/i/1000v/83/83/delicious-tasty-breakfast-cartoon-vector-24468383.jpg", translation: "My breakfast" },
            { text: "شیر", pronunciation: "shir", image: "https://cbx-prod.b-cdn.net/COLOURBOX62417729.jpg?width=800&height=800&quality=70", translation: "Milk" },
            { text: "عَسل", pronunciation: "asal", image: "https://static.vecteezy.com/system/resources/previews/017/219/938/non_2x/cartoon-cute-bee-carrying-honey-dipper-to-take-honey-from-honey-pot-bee-character-illustration-png.png", translation: "Honey" },
        ]
        },
        {
        sentence: "مادَر برایَم تُخم‌مُرغ پُخت.",
        words: [
            { text: "تَخم‌مُرغ", pronunciation: "tokhm-e morgh", image:"https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/509fefb5-bf9c-42d5-934a-0425d8612e11/eadbd16b-14a1-4191-809e-34232364e071.png" , translation: "Egg" },
        ]
        },
        {
        sentence: "مَن با خواهَرَم صُبحانِه خوردم.",
        words: [
        ]
        },
        {
        sentence: "صُبح زود چای خوردَم.",
        words: [
            { text: "چای", pronunciation: "chāy", image: "https://img.freepik.com/premium-vector/cartoon-illustration-cup-tea-with-smiley-face_180868-3002.jpg?w=360", translation: "Tea" },
        ]
        },
        {
        sentence: "دوست دارم نان و مُرَبا بُخورَم.",
        words: [
            { text: "نان", pronunciation: "nān", image: "https://cdn.vectorstock.com/i/1000v/53/07/thanksgiving-baked-bread-cartoon-colored-clipart-vector-43185307.jpg", translation: "Bread" },
            { text: "مُرَبا", pronunciation: "marbā", image: "https://icon2.cleanpng.com/ci2/gzz/iut/aqru265v3.webp", translation: "Jam" },
        ]
        },
        {
        sentence: "صُبحانِه مُهم اَست.",
        words: [
        ]
        },
        {
        sentence: "بابا نان خَرید.",
        words: [
            { text: "نان", pronunciation: "nān", image: "https://cdn.vectorstock.com/i/1000v/53/07/thanksgiving-baked-bread-cartoon-colored-clipart-vector-43185307.jpg", translation: "Bread" },
        ]
        },
        {
        sentence: "مَن خُرما و شیر دوست دارَم.",
        words: [
            { text: "خُرما", pronunciation: "kharmā", image: "https://img.freepik.com/premium-photo/dates-2d-vector-illustration-cartoon-white-background-h_889056-22146.jpg", translation: "Date" },
            { text: "شیر", pronunciation: "shir", image: "https://cbx-prod.b-cdn.net/COLOURBOX62417729.jpg?width=800&height=800&quality=70", translation: "Milk" },
        ]
        },
        {
        sentence: "هَر روز صُبح شیر می‌نوشَم.",
        words: [
            { text: "شیر", pronunciation: "shir", image: "https://cbx-prod.b-cdn.net/COLOURBOX62417729.jpg?width=800&height=800&quality=70", translation: "Milk" },
        ]
        },
        {
        sentence: "بیسکُویت و ماست خوردَم.",
        words: [
            { text: "بیسکُویت", pronunciation: "biskuit", image: "https://i.pinimg.com/736x/bb/7c/29/bb7c293a568df9297ba03933f50380f0.jpg", translation: "Biscuit" },
            { text: "ماست", pronunciation: "māst", image: "https://www.shutterstock.com/image-vector/spoon-yogurt-vector-illustration-600nw-1396014698.jpg", translation: "Yogurt" },
        ]
        },
        {
        sentence: "مَن با دوست‌هایَم صُبحانِه خوردَم.",
        words: [
            { text: "صُبحانِه", pronunciation: "sobhāne", image: "https://cdn.vectorstock.com/i/1000v/83/83/delicious-tasty-breakfast-cartoon-vector-24468383.jpg", translation: "Breakfast" },
        ]
        },
        {
        sentence: "صُبحانِه‌اَم خُوشمَزه بود.",
        words: [
        ]
        },
        {
        sentence: "اِمروز کَره وَ عَسَل خوردَم.",
        words: [
            { text: "کَرِه", pronunciation: "koreh", image: "https://thumbs.dreamstime.com/z/cartoon-butter-cutting-board-margarine-spread-natural-dairy-product-vector-brick-wooden-high-calorie-food-cooking-225918083.jpg", translation: "Butter" },
            { text: "عَسَل", pronunciation: "asal", image: "https://t4.ftcdn.net/jpg/06/12/86/49/360_F_612864989_v6TrLkbttR4sjm9vj7bMvtTxO7Xw4ZXY.jpg", translation: "Honey" },
        ]
        }
    ]
    },
  // جملات حرف پ
    // {
    // title: "جُملات حرف پ",
    // imgSide:`${process.env.PUBLIC_URL}/images/assetWord/designPage/girlFlower.png`,
    // slides: [
    //     {
    //       sentence: "پِدَر کُت پوشید.",
    //       words: [
    //         { text: "پِدَر", pronunciation: "pedar", image: "https://as2.ftcdn.net/jpg/05/90/76/63/1000_F_590766385_fNUflArJKMCTiF5g693MIqibUugq2Ugc.jpg", translation: "Father" },
    //         { text: "کُت", pronunciation: "kat", image: "https://www.shutterstock.com/image-vector/men-suit-english-mustard-color-260nw-2325792317.jpg", translation: "Coat" }
    //       ]
    //     },
    //     {
    //       sentence: "شاپَرَک پَر کَشید.",
    //       words: [
    //         { text: "شاپَرَک", pronunciation: "shāparak", image: "https://static.vecteezy.com/system/resources/previews/046/498/192/non_2x/cartoon-butterfly-isolated-on-transparent-background-colorful-and-detailed-nature-illustration-png.png", translation: "Butterfly" },
    //         { text: "پَر", pronunciation: "par", image: "https://i.ytimg.com/vi/w4aIAK6KgCE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDUAB3kdRPXoKVK9-h_vl443lg97Q", translation: "Wing" }
    //       ]
    //     },
    //     {
    //       sentence: "پَرَندِه دَر آسِمان پَرواز می کُنَد.",
    //       words: [
    //         { text: "پَرَندِه", pronunciation: "parande", image: "https://t3.ftcdn.net/jpg/07/85/95/08/360_F_785950828_ztkvuSs1EjXxRWlX4Twer4QG5HZNSCaa.jpg", translation: "Bird" },
    //         { text: "آسِمان", pronunciation: "āsemān", image: "https://static.vecteezy.com/system/resources/thumbnails/039/351/223/small_2x/cartoon-summer-sky-landscape-of-bright-sunny-day-with-floating-white-cumulus-clouds-outdoor-scenery-with-blue-sky-background-illustration-vector.jpg", translation: "Sky" },
    //         { text: "پَرواز", pronunciation: "parvaz", image: "https://www.clipartmax.com/png/middle/296-2960357_birds-flying-clipart-birds-cartoon-black-and-white.png", translation: "Flying" }
    //       ]
    //     },
    //     {
    //       sentence: "پارسـا توپ را پَرت کَرد.",
    //       words: [
    //         { text: "توپ", pronunciation: "tup", image: "https://images.freeimages.com/clg/istock/previews/1048/104803801-ball-kids-toys-colored-illustration-for-children.jpg", translation: "Ball" },
    //         { text: "پَرت", pronunciation: "part", image: "https://png.pngtree.com/png-clipart/20230814/original/pngtree-little-boy-throwing-ball-illustration-small-pupil-vector-picture-image_10629685.png", translation: "Throw" }
    //       ]
    //     },
    //     {
    //       sentence: "پَری با پَنیر پیتزا می پَزَد.",
    //       words: [
    //         { text: "پَنیر", pronunciation: "panir", image: "https://i.graphicmama.com/uploads/2024/7/6683c6ccb2947-Cheese-Cartoon-Character.png", translation: "Cheese" },
    //         { text: "پیتزا", pronunciation: "pitza", image: "https://png.pngtree.com/png-clipart/20250309/original/pngtree-funny-pizza-slice-cartoon-character-png-image_20610973.png", translation: "Pizza" },
    //         { text: "پُختَن", pronunciation: "pokhtan", image: "https://media.istockphoto.com/id/1369712605/vector/cooking-food-in-frying-pan-vector-illustration-of-cut-vegetables-cooked-on-gas-stove-cartoon.jpg?s=612x612&w=0&k=20&c=3H9TU5PosN-vYYFQCahK-RdA695_41QiT90n1re_0j0=", translation: "Cooking" }
    //       ]
    //     },
    //     {
    //       sentence: "نان کَپَک زَدِه است.",
    //       words: [
    //         { text: "نان", pronunciation: "nān", image: "https://cdn.vectorstock.com/i/500p/51/09/animated-sliced-bread-character-vector-4015109.jpg", translation: "Bread" },
    //         { text: "کَپَک", pronunciation: "kapak", image: "https://www.shutterstock.com/image-vector/inedible-bread-mould-illustration-260nw-2206427471.jpg", translation: "Mold" }
    //       ]
    //     },
    //     {
    //       sentence: "شامپو مو را پاک می کُنَد.",
    //       words: [
    //         { text: "شامپو", pronunciation: "shampo", image: "https://static.vecteezy.com/system/resources/previews/007/706/933/non_2x/shampoo-natural-organic-skin-care-products-natural-shampoo-for-hair-cosmetics-with-herbs-for-body-modern-cartoon-illustrations-isolated-on-a-white-background-vector.jpg", translation: "Shampoo" },
    //         { text: "مو", pronunciation: "mu", image: "https://thumbs.dreamstime.com/b/red-wavy-back-hairstyle-single-icon-cartoon-style-vector-symbol-stock-illustration-web-93761686.jpg", translation: "Hair" },
    //       ]
    //     },
    //     {
    //       sentence: "سُپیده به دیوار پَرده آویزَان کَرد.",
    //       words: [
    //         { text: "دیوار", pronunciation: "divār", image: "https://static9.depositphotos.com/1526816/1158/v/450/depositphotos_11580176-stock-illustration-wall.jpg", translation: "Wall" },
    //         { text: "پَرده", pronunciation: "parde", image: "https://previews.123rf.com/images/rastudio/rastudio1202/rastudio120200010/12372140-cartoon-home-window.jpg", translation: "Curtain" },
    //         { text: "آویزان", pronunciation: "āvizān", image: "https://www.shutterstock.com/image-vector/man-hanging-curtains-flat-color-260nw-1792604128.jpg", translation: "Hanging" }
    //       ]
    //     }
    //   ]
    // },
// جملات حرف خ
// (باید عکس ها را عوض کنی!!!!!)
    // {
    //   title: "جُملات حرف خ",
    //   imgSide:"https://clipart-library.com/images/dc4ok8Loi.jpg",
    //   slides: [
    //     {
    //       sentence: "اُستاد با میخ و تَخته میز  می سازَد.",
    //       words: [
    //         { text: "میخ", pronunciation: "mikh", image: "https://media.istockphoto.com/id/1202543150/vector/metal-nail-vector-isolated-illustration.jpg?s=612x612&w=0&k=20&c=eQlQVzU-TH9nZ6Mty6b54_EboRAS3lCG_k7m66KpoIQ=", translation: "Nail" },
    //         { text: "تَخته", pronunciation: "takhte", image: "https://cbx-prod.b-cdn.net/COLOURBOX63534787.jpg?width=800&height=800&quality=70", translation: "Wood plank" },
    //         { text: "میز", pronunciation: "mizz", image: "https://img.freepik.com/premium-vector/modern-school-desk-clipart-vector-illustration_1316704-52480.jpg", translation: "desk" }
    //       ]
    //     },
    //     {
    //       sentence: "خانِواده‌ یِ خانُم رضایی به کِنار رودخانه رَفتَند.",
    //       words: [
    //         { text: "خانِواده", pronunciation: "khānevāde", image: "https://img.freepik.com/premium-vector/family-consisting-parents-children-is-fishing-together-river-silly-cartoon-featuring-family-monsters-getting-into-some-mischief-home_538213-58164.jpg", translation: "Family" },
    //         { text: "رودخانه", pronunciation: "rudkhāne", image: "https://img.freepik.com/premium-photo/cartoon-style-river-scene-with-flowing-blue-river-center-lush-green-grass-trees_1157715-15152.jpg?semt=ais_hybrid&w=740&q=80", translation: "River" }
    //       ]
    //     },
    //     {
    //       sentence: "خانه‌ ی خَرگوش زِیر دَرَخت اَست.",
    //       words: [
    //         { text: "خانه", pronunciation: "khāne", image: "https://img.freepik.com/premium-vector/illustration-rabbit-house-underground-farm_1323048-67345.jpg", translation: "House" },
    //         { text: "خَرگوش", pronunciation: "khargush", image: "https://image.lexica.art/full_webp/f350c8be-9bd4-4f9d-a52c-713b358f9543", translation: "Rabbit" },
    //       ]
    //     },
    //     {
    //       sentence: "شاخِ گوزَن شِکَستِه اَست.",
    //       words: [
    //         { text: "شاخ", pronunciation: "shākh", image: "https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-deer-horn-vector-png-image_6881711.png", translation: "Horn" },
    //         { text: "گوزَن", pronunciation: "gavazn", image: "https://t4.ftcdn.net/jpg/05/99/27/55/360_F_599275596_6WA4IgEOgKpS0NxpEgaMv5CcItB9imDn.jpg", translation: "Deer" }
    //       ]
    //     },
    //     {
    //       sentence: "مادَر با نَخ دامَنِ دُختَر را می دوزَد.",
    //       words: [
    //         { text: "نَخ", pronunciation: "nakh", image: "https://img.freepik.com/premium-photo/thread-2d-cartoon-vector-illustration-white-background_889056-28927.jpg", translation: "Thread" },
    //         { text: "دامَن", pronunciation: "dāman", image: "https://png.pngtree.com/png-clipart/20230913/original/pngtree-skirt-clipart-an-anime-style-skirt-cartoon-vector-png-image_11078179.png", translation: "Skirt" },
    //         { text: "دُختَر", pronunciation: "dokhtar", image: "https://img.pikbest.com/png-images/20241120/muslim-girl-cartoon-character-illustration_11111864.png!sw800", translation: "Girl" }
    //       ]
    //     },
    //     {
    //       sentence: "آب دَر گَرمـا آدَم را خُنُک می کُنَد.",
    //       words: [
    //         { text: "آب", pronunciation: "āb", image: "https://media.istockphoto.com/id/477867499/vector/water-drop-character-holding-a-glass.jpg?s=612x612&w=0&k=20&c=j7mZW-JC4DZLhBizmfh25Wv6ra9uP8hkDYJmr1QA9vs=", translation: "Water" },
    //         { text: "گَرمـا", pronunciation: "garmā", image: "https://previews.123rf.com/images/xiongwu5/xiongwu52206/xiongwu5220600389/187989933-too-hot-in-summer-character-heat-stroke-high-temperature-warning-hot-summer-day-vector.jpg", translation: "Heat" },
    //         { text: "آدَم", pronunciation: "ādam", image: "https://www.shutterstock.com/image-vector/pictogram-person-cartoon-character-260nw-1058740319.jpg", translation: "Person" },
    //         { text: "خُنُک", pronunciation: "khonok", image: "https://www.shutterstock.com/image-vector/cute-kawaii-girl-cooling-her-260nw-1992607868.jpg", translation: "Cool" }
    //       ]
    //     },
    //     {
    //       sentence: "خَروس صُبح زود آواز می‌خوانَد.",
    //       words: [
    //         { text: "خَروس", pronunciation: "kharus", image: "https://www.shutterstock.com/image-vector/rooster-crows-speaker-600nw-2478573723.jpg", translation: "Rooster" },
    //         { text: "آواز", pronunciation: "āvāz", image: "https://thumbs.dreamstime.com/b/illustrated-rooster-crowing-musical-notes-emanating-its-open-beak-upward-air-vibrant-illustration-coming-397269024.jpg", translation: "Song" }
    //       ]
    //     },
    //     {
    //       sentence: "دَستِ کودک خِیلی کوچَک اَست.",
    //       words: [
    //         { text: "دَست", pronunciation: "dast", image: "https://static.vecteezy.com/system/resources/previews/036/133/371/non_2x/the-father-s-hand-holds-the-baby-s-hand-child-s-hand-in-dad-s-hand-illustration-vector.jpg", translation: "Hand" },
    //         { text: "کودک", pronunciation: "koodak", image: "https://www.shutterstock.com/image-vector/baby-boy-pacifier-mouth-lying-260nw-507915088.jpg", translation: "Child" },
    //       ]
    //     },
    //     {
    //       sentence: "خَرچَنگ روی ساحِل رَفت.",
    //       words: [
    //         { text: "خَرچَنگ", pronunciation: "kharchang", image: "https://thumbs.dreamstime.com/b/cartoon-crab-beach-boat-playful-crab-beach-boat-background-enjoying-sunny-coastal-scene-355395720.jpg", translation: "Crab" },
    //         { text: "ساحِل", pronunciation: "sāhel", image: "https://static.vecteezy.com/system/resources/thumbnails/006/823/045/small_2x/beach-cartoon-scenery-background-free-vector.jpg", translation: "Beach" }
    //       ]
    //     },
    //     {
    //       sentence: "کودَک با دوستَش خَندید.",
    //       words: [
    //         { text: " کودَک خَندید", pronunciation: "koodak", image: "https://media.istockphoto.com/id/963896642/vector/laughing-children.jpg?s=612x612&w=0&k=20&c=gTbHkFJKOsXiMMzm7qncZJMFSzLaycXq4VoY6fArzPQ=", translation: "Child" },
    //       ]
    //     }
    //   ]
    // },


];


/* lessonGroups ... (همان داده‌ای که شما قبلاً گذاشته‌اید) */
// const lessonGroups = [ /* ... keep your existing data ... */ ];

const removeArabicDiacritics = (text = "") => {
  // حذف تشکيل‌ها/حركات عربی و برخی ترکیبات رایج
  return text.replace(/[\u064B-\u0652\u0670\u06D6-\u06ED]/g, "");
};

const SentenceObject = () => {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [mainTitle, setMainTitle] = useState("صبحانه");
  const [imgSide, setImgSide] = useState(`${process.env.PUBLIC_URL}/images/assetWord/designPage/girlSitting.png`);

  // states for highlighting
  const [highlightChar, setHighlightChar] = useState("");
  const [stripDiacritics, setStripDiacritics] = useState(true);

  const currentGroup = lessonGroups[activeGroupIndex];
  const currentSlides = currentGroup.slides;
  const currentWords = currentSlides[activeSlideIndex].words;

  const handleGroupSelect = (index, i,imgS) => {
    setMainTitle(i);
    setImgSide(imgS);
    setActiveGroupIndex(index);
    setActiveSlideIndex(0);
    setSelectedWord(null);
  };

  const handleSlideSelect = (index) => {
    setActiveSlideIndex(index);
    setSelectedWord(null);
  };

  // helper: آیا یک کاراکتر باید هایلایت شود؟
  const charMatches = (ch) => {
    if (!highlightChar) return false;
    if (stripDiacritics) {
      return (
        removeArabicDiacritics(ch) ===
        removeArabicDiacritics(highlightChar)
      );
    }
    return ch === highlightChar;
  };


  return (
    <Container className="mt-4" dir="rtl" style={{ minHeight: "700px" }}>
      <Row className="mb-3">
        <Col xs={12} className="text-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? "پنهان کردن فهرست" : "نمایش فهرست"}
          </Button>
        </Col>
      </Row>


      <Row>
        {showSidebar && (
          <Col md={3}>
            <h5 className="mb-3">فهرست</h5>
            <ListGroup>
              {lessonGroups.map((group, index) => (
                <ListGroup.Item
                  key={index}
                  active={index === activeGroupIndex}
                  action
                  onClick={() => handleGroupSelect(index, group.title,group.imgSide)}
                >
                  {group.title}
                </ListGroup.Item>

              ))}
            </ListGroup>
          </Col>
        )}

        <Col md={showSidebar ? 9 : 12} className="text-center">
          <div
            className="mx-5 my-3 p-4 rounded-pill text-light text-center  mx-auto"
            style={{ backgroundColor: "",width:"75%",height:"300px",position:"relative" }}
          >
            <img src={`${process.env.PUBLIC_URL}/images/assetWord/designPage/title1.png`} className="w-100 h-100" alt="" />
            <div>
              <h3 className="text-dark text-center maintitle1d" >
                {mainTitle}
              </h3>

            </div>
          </div>

          <Carousel
            activeIndex={activeSlideIndex}
            onSelect={handleSlideSelect}
            controls={true}
            indicators={false}
            interval={null}
          >
            {currentSlides.map((slide, index) => (
              <Carousel.Item key={index}>
                <h1
                  className="py-5 mx-4 rounded text-center"
                  style={{ backgroundColor: "rgba(135, 187, 239, 0.7)" }}
                >
                  {slide.sentence}
                </h1>
              </Carousel.Item>
            ))}
          </Carousel>

          <Row className="mt-4 justify-content-center">
            <Col>
              <div className="d-flex flex-wrap justify-content-start mx-5 gap-2">
                {currentWords.map((word, i) => (
                  <Button
                    key={i}
                    variant="outline-success"
                    className="px-3"
                    onClick={() => setSelectedWord(word)}
                  >
                    <h3 style={{ margin: 0 }}>
                      {word.text}
                    </h3>
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          <div className="box-img" >
            {selectedWord && (
              <>
              {/* <div className="border border-info" style={{position:"relative"}}> */}
                <Row className="mt-4 justify-content-center text-center">
                  <Col md={5} className="bg-warning p-2 rounded" style={{ width: "400px",height:"350px" }}>
                    <Image className="w-100 h-75" src={selectedWord.image} fluid rounded />
                    <p className="mt-2 h2 fs-2" style={{ color: "rgb(240, 19, 148)" }}>
                      {selectedWord.translation}
                    </p>
                  </Col>
                  <div className=" b-img col-sm-0 col-md-3 mt-5"  >
                    <img src={imgSide}  className=" w-50 h-50" alt="" />
                  </div>
                </Row>

              {/* </div> */}
              
              </>
            )}
          </div>
        </Col>
      </Row>
      {/* <div className="text-muted">SentenceObject</div> */}
      
      <style>{`
      .maintitle1d{
            position:absolute;top:65%;left:40%;zIndex:100;
          }
        .box-img{
          min-height: 400px;
        }
        @media (max-width: 720px) {
          .maintitle1d{
            position:absolute;top:65%;left:35%;zIndex:100;
          }
          .b-img{
            display: none;
          }
          .box-img{
            min-height: 350px;
          }
        
        }

      
      `}</style>




    </Container>
  );
};

export default SentenceObject;


