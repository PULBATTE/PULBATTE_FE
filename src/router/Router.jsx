import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import Header from '../components/common/header/Header';
import Kakao from '../page/sign/Kakao';
import SignIn from '../page/sign/SignIn';
import Home from '../page/home/Home';
import SignUp from '../page/sign/SignUp';
import PostList from '../page/community/PostList';
import NotFound from '../page/NotFound';
import CreatePost from '../page/community/CreatePost';
import PlantSearch from '../page/search/PlantSearch';
import AddPlant from '../page/plantdiary/AddPlant';
import DetailPlant from '../page/plantdiary/DetailPlant';
import PlantList from '../page/plantdiary/PlantLIst';
import DonePost from '../page/community/DonePost';
import PlantGuide from '../page/plantguide/PlantGuide';
import PlantChoice from '../page/plantguide/PlantChoice';
import PlantSearchDetail from '../page/search/PlantDetail';
import PlantTest from '../page/plantguide/PlantTest';
import PlantResult from '../page/plantguide/PlantResult';
import Mypage from '../page/mypage/Mypage';
import EditPost from '../page/community/EditPost';
import { getAlarmListApi } from '../apis/alarm';
import { authInstance } from '../apis/axios';

export default function Router() {
  const [listening, setListening] = useState(false);
  const token = localStorage.getItem('access_Token');
  const [alarmList, setAlarmList] = useState([]);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    if (!listening && token !== undefined) {
      const eventSource = new EventSource(
        `https://api.pulbatte.com/api/user/subscribe`,
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
          heartbeatTimeout: 300 * 1000,
        },
      );
      const fetchData = async () => {
        try {
          eventSource.onopen = event => {
            const data = getAlarmListApi();
            console.log(data);
          };
          eventSource.onmessage = async event => {
            const result = JSON.parse(event.data);
            console.log(result);
          };

          eventSource.onerror = async event => {
            console.log(event.error.message);
            if (!event.error.message.includes('No activity')) {
              console.log('에러 이벤트 발생');
              eventSource.close();
            }
          };

          eventSource.addEventListener('connect', async function (event) {
            const result = JSON.parse(event.data);
            console.log(result);
            setAlarmList(old => [result, ...old]);
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      return () => {
        return () => eventSource.close();
      };
    }
    return setListening(true);
  }, [EventSource, token]);

  return (
    <BrowserRouter>
      <Header alarmList={alarmList} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/user/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/api/user/kakao/callback" element={<Kakao />} />
        <Route path="/api/user/signup" element={<SignUp />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/plantsearch" element={<PlantSearch />} />
        <Route path="/addplant" element={<AddPlant />} />
        <Route path="/detailplant/:plantJournalId" element={<DetailPlant />} />
        <Route path="/plantlist" element={<PlantList />} />
        <Route path="/donepost/:postId" element={<DonePost />} />
        <Route path="/editPost/:currentPostId" element={<EditPost />} />
        <Route path="/plantguide" element={<PlantGuide />} />
        <Route path="/plantchoice" element={<PlantChoice />} />
        <Route
          path="/api/plants/detail/:plantId"
          element={<PlantSearchDetail />}
        />
        <Route path="/planttest" element={<PlantTest />} />
        <Route path="/testresult" element={<PlantResult />} />\
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}
