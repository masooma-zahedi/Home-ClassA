import React from "react";
import StoryPage3 from "../sections/story/StoryPage3";
import WordGameWithCategories from "../sections/alphabet/WordGameWithCategories";
import SpellingGame from "../sections/alphabet/SpellingGame";
import DragDropQuiz from "../sections/word/DragDropQuiz";
import SortableSentencesApp from "../sections/word/SortableSentencesApp";
import SentenceObject from "../sections/word/SentenceObject";
import ObjectSentenceGame from "../sections/alphabet/ObjectSentenceGame";

export default function Home() {
  return (<>
  <div >
    <div className="h5 m-5 border border-3 border-warning p-4 text-center bg-info rounded">بچه ها جملات زیر را تمرین کنند و از روی 7 جمله جواب درست آن بنویسند.  </div>
    {/* <SpellingGame/> */}
    {/* <WordGameWithCategories initialCategory="وسایل مدرسه" /> */}
    {/* <SentenceObject/> */}
        {/* <StoryPage3 groupKey="alefba" wantedTitle="روباه وَ رُودخانه"/> */}
        {/* <DragDropQuiz/> */}
        <ObjectSentenceGame/>

    <div>
      <h5 className="bg-warning p-4 m-4 rounded text-center">برای احسان : خلاصه داستان را بنویسید.  </h5>
          {/* <SortableSentencesApp/> */}
          <StoryPage3 groupKey="kalemat" wantedTitle="مینا و راستگویی"/>
    </div>
  </div>

  </>)
}
