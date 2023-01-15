import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/common/header/Header';
import Kakao from '../page/signin/Kakao';
import SignIn from '../page/signin/SignIn';
import Home from '../page/home/Home';
import NotFound from '../page/NotFound';
import SignUp from '../page/signin/SignUp';
import CreatePost from '../page/community/CreatePost';
import PlantSearch from '../page/search/PlantSearch';
import AddPlant from '../page/plantdiary/AddPlant';
import DetailPlant from '../page/plantdiary/DetailPlant';
import PlantList from '../page/plantdiary/PlantLIst';
import DonePost from '../page/community/DonePost';
import PlantGuide from '../page/plantguide/PlantGuide';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/user/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/api/user/kakao/callback" element={<Kakao />} />
        <Route path="/api/user/signup" element={<SignUp />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/api/plants" element={<PlantSearch />} />
        <Route path="/addplant" element={<AddPlant />} />
        <Route path="/detailplant" element={<DetailPlant />} />
        <Route path="/plantlist" element={<PlantList />} />
        <Route path="/donepost" element={<DonePost />} />
        <Route
          path="/api/beginner/plant/:beginnerName"
          element={<PlantGuide />}
        />
      </Routes>
    </BrowserRouter>
  );
}
