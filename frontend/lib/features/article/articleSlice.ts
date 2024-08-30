import { Url } from '@/lib/Url';
import { ArticleData } from '@/lib/InterfaceData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface articleState {
    article: ArticleData[] | null
    status: "idle" | "loading" | "success" | "failed";
    error: string | null
};


const initialState: articleState = {
    article: [],
    status: "idle",
    error: null,
};

export const getAllArticle = createAsyncThunk("articles", async ():Promise<ArticleData[]> => {
           
    const response = await axios.get(Url.getAllArticle);
    return response.data.data;
})


export const articleSlice = createSlice({
  name: 'article',
  initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllArticle.pending,(state):void=> {
                state.status = "loading";
            })
        
            .addCase(getAllArticle.fulfilled, (state, action):void => {
                state.status = "success";
                state.article = action.payload || [];
            })

            .addCase(getAllArticle.rejected, (state, action):void => {
                state.status = 'failed';
                state.error = action.error.message as string;
            });

        
    },
})

// Action creators are generated for each case reducer function

export const selectArticle = (state: any):ArticleData[] => state.article.article;
export const selectArticleStatus = (state: { article: { status:"idle" | "loading" | "success" | "failed"; }; }) => state.article.status;

export const {} = articleSlice.actions;

export default articleSlice.reducer;