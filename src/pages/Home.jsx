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

export default function Home() {
  return (<>
  <div >
    <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-info rounded">بچه ها داستان زیر را بخوانند و اسامی وسایل خانه را یاد بگیرند و از روی آن یکبار بنویسند.  </div>
          <SpellingGame/>
    {/* <WordGameWithCategories initialCategory="وسایل مدرسه" /> */}
    {/* <SentenceObject/> */}
        <StoryPage3 groupKey="alefba" wantedTitle="سَفَر با کَشـتی"/>
        {/* <ObjectSentenceGame/> */}
        {/* <VideoWithCaptions/> */}
      {/* <VideoCard
        title="قصه کوتاه امروز"
        description="متن فارسی داستان زیر را بخوانید."
        videoFileName={`${process.env.PUBLIC_URL}/video/chick.mp4`}  // فقط اسم فایل ویدیوی mp4
      /> */}
{/* ****************************************************** */}
    <div>
      <h5 className="bg-warning p-4 m-4 rounded text-center">برای احسان : فعالیت زیر را تمرین و از روی هفت جمله آن بنویسد.  </h5>
            <DragDropQuiz/>
          {/* <SortableSentencesApp/> */}
          {/* <SentenceBuilder/> */}
          {/* <StoryPage3 groupKey="kalemat" wantedTitle="مینا و راستگویی"/> */}
          {/* <StoryPage3 groupKey="dastan" wantedTitle="آهوی یک‌چشم *"/> */}
    </div>
  </div>

  <div className="container mt-4">
      <h5>تمرین نوشتن — با خطوط راهنما و دانلود</h5>
      <DragWriteBoxWithGuides
        width={740}
        height={520}
        showGuides={true}
        downloadName="persian_practice.png"
      />
    </div>

  </>)
}
