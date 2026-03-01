import React from "react";
import StoryPage3 from "../sections/story/StoryPage3";
import WordGameWithCategories from "../sections/alphabet/WordGameWithCategories";
import SpellingGame from "../sections/alphabet/SpellingGame";
import DragDropQuiz from "../sections/word/DragDropQuiz";
import SortableSentencesApp from "../sections/word/SortableSentencesApp";
import SentenceObject from "../sections/word/SentenceObject";
import ObjectSentenceGame from "../sections/alphabet/ObjectSentenceGame";
import VideoWithCaptions from "../sections/alphabet/VideoCard";
import VideoCard from "../sections/alphabet/VideoCard";
import SentenceBuilder from "../sections/word/SentenceBuilder";
import DragWriteBoxWithGuides from "../sections/alphabet/DragWriteBoxWithGuides ";
import TypingQAImageSlider from "../sections/word/TypingQAImageSlider";
import TypingImageText from "../sections/word/TypingImageText";
import MatchingLettersPicturs from "../sections/alphabet/MatchingLettersPicturs";
import ColoringCanvasPro from "../sections/alphabet/ColoringCanvasPro ";

export default function Home() {
  return (<>
  <div >
    <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-info rounded">بچه ها : جاهای خالی را با کلمات مناسب پر کنند و از روی شش جمله درست بنویسند..  </div>
        {/* <VideoCard
      title="قصه کوتاه امروز"
      description="متن فارسی داستان زیر را بخوانید."
      videoFileName={`${process.env.PUBLIC_URL}/video/fox&crew.mp4`}  // فقط اسم فایل ویدیوی mp4
    /> */}

    {/* <ColoringCanvasPro
  imageSrc={`${process.env.PUBLIC_URL}/images/test/mouse1.png`}
  // imageSrc={`${process.env.PUBLIC_URL}/images/assetWord/designPage/girlSitting.png`}
  colors={["#ff0000", "#00ccff", "#ffaa00", "#8800ff","#10902eff", "#ff9500", "#ffcc00", "#34c759", "#0c09b7ff", "#5856d6", "#a0364aff"]}
/> */}
          {/* <SentenceBuilder/> */}
        {/* <SentenceObject/> */}
        {/* <StoryPage3 groupKey="alefba" wantedTitle="دُکمه‌ی گُمشُده"/> */}
          {/* <StoryPage3 groupKey="kalemat" wantedTitle="دُکمه‌ی گُمشُده"/> */}
        <DragDropQuiz/>
          {/* <SpellingGame/> */}
          {/* <TypingQAImageSlider/> */}
          {/* <MatchingLettersPicturs/> */}
    {/* <div className="container  mt-4" dir="rtl">
      <DragWriteBoxWithGuides textTitle="ما دَر مَدرِسه چیزهای زیادی یاد می گیریم" width={840} height={520} showGuides={true} downloadName="persian_practice.png"/>
    </div> */}
        {/* <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-success text-light rounded">کلمات زمستانی </div>
    <WordGameWithCategories initialCategory="زمستان" /> */}
    {/* <ObjectSentenceGame/> */}
    {/* <VideoWithCaptions/> */}
{/* ****************************************************** */}
    <div>
      <h5 className="bg-warning p-4 m-4 rounded text-center">برای احسان : داستان زیر را بخواند و از روی کلمات آن با معنی بنویسد.  </h5>
          <StoryPage3 groupKey="kalemat" wantedTitle="یِک نِگاهِ دیگَر"/>
          {/* <SortableSentencesApp/> */}
          {/* <StoryPage3 groupKey="dastan" wantedTitle="آهوی یک‌چشم *"/> */}
          {/* <TypingImageText srcImg="https://media.istockphoto.com/id/1204470108/vector/cute-kids-reading-book-and-librarian-in-library-flat-cartoon-illustration.jpg?s=612x612&w=0&k=20&c=NnfqdhoAmTMeNTBD6cvWHwc5pf8K3W-aCrbSOj9Plag="/> */}
    </div>
  </div>


  </>)
}
