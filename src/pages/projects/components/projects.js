import React from "react";
import NQueens from "./nqueen";
import MvpClassifier from "./mvp-classifier";
import Search from "./search";
import Ai from "./ai";

export default function Projects() {
    return  (
        <div>
            <Search/>
            <Ai/>
            <MvpClassifier/>
            <NQueens/>
        </div>
    )
}