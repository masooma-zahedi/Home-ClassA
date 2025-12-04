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

export default function Home() {
  return (<>
  <div >
    <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-info rounded">بچه ها داستان زیر را بخوانند و تا سه خط آن را بنویسند. </div>
        <StoryPage3 groupKey="alefba" wantedTitle="بَـرادَرِ کوچکِ مَن"/>
          {/* <SpellingGame/> */}
          {/* <TypingQAImageSlider/> */}
          <MatchingLettersPicturs/>
    <div className="container  mt-4" dir="rtl">
      <DragWriteBoxWithGuides textTitle="ما دَر مَدرِسه چیزهای زیادی یاد می گیریم" width={840} height={520} showGuides={true} downloadName="persian_practice.png"/>
    </div>
    {/* <WordGameWithCategories initialCategory="وسایل مدرسه" /> */}
    {/* <SentenceObject/> */}
    {/* <ObjectSentenceGame/> */}
    {/* <VideoWithCaptions/> */}
    {/* <VideoCard
      title="قصه کوتاه امروز"
      description="متن فارسی داستان زیر را بخوانید."
      videoFileName={`${process.env.PUBLIC_URL}/video/chick.mp4`}  // فقط اسم فایل ویدیوی mp4
    /> */}
{/* ****************************************************** */}
    <div>
      <h5 className="bg-warning p-4 m-4 rounded text-center">برای احسان : داستان زیر را بخواند و تا بالای عکس بنویسد.  </h5>
            {/* <DragDropQuiz/> */}
          {/* <SortableSentencesApp/> */}
          {/* <SentenceBuilder/> */}
          <StoryPage3 groupKey="kalemat" wantedTitle="عَلی و تَنبلی"/>
          {/* <StoryPage3 groupKey="dastan" wantedTitle="آهوی یک‌چشم *"/> */}
          {/* <TypingImageText srcImg="https://www.shutterstock.com/image-photo/cartoon-artistic-image-boy-9-260nw-2600592373.jpg"/> */}
    </div>
  </div>


  </>)
}
