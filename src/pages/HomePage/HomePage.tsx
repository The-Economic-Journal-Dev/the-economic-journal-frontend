import Body from "../../components/Body/Body.tsx";
import style from "./HomePage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { TrendingTitleDecoration } from "./components/TrendingTitleDecoration.tsx";
import MainColumn from "./components/MainColumn.tsx";
import { SubColumn, SubColumnWithImage } from "./components/SubColumns.tsx";
import { auth } from "../../firebase.tsx";

// TypeScript interface to define the schema fields for Article
interface IArticleData {
  authorUid: string;
  title: string;
  metaTitle: string;
  datePublished: Date;
  lastUpdated: Date;
  imageUrl?: string;
  summary?: string;
  articleBody: string;
  category: "Finance" | "Economic" | "Business" | "Entrepreneurship";
  likesCount: number;
  articleText?: string;
}

function HomePage() {
  const [apiData, setAPIData] = useState<IArticleData[]>([]);
  const url = "https://api.theeconomicjournal.org/articles?includeText=true";
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await fetch(url);
        const posts = [
          {
            "datePublished": "2024-08-21T05:54:46.560Z",
            "lastUpdated": "2024-08-21T05:57:04.481Z",
            "position": null,
            "likesCount": 0,
            "_id": "66c581af7bf566004b7bc8a5",
            "authorUid": "SIVvOpmfJoNqI0r0YeJCnpUBb7F3",
            "title": "lmao ",
            "metaTitle": "hmmmm",
            "category": "Finance",
            "imageUrl": "https://images.theeconomicjournal.org/image-1724219823491-325596726.png",
            "summary": "\t  There’s a tiny island nation that is smaller than New York City and is one of the wealthiest countries in the world. Its GDP per capita has surpassed the likes of China, the US, and other developed countries    Source: IMF  Over 6 decades, Singapore has transformed from a colonial trading port that has very few land and natural resources. But after its independence in 1965, the former British colony was transformed into a major manufacturing and financial centre that’s envied the world over. And it became an example for any country seeking to grow a robust, high-tech economy. Its wealth is the result of a decade of planning by a party that’s been in power since independence.  \"Some of the biggest sectors domestically — shipbuilding, electronics, banking, and now they're very involved in private banking — got their start because Lee Kuan Yew and the government specially directed state funds into those areas,\" says Josh Kurlantzick of the Council on Foreign Relations.  What’s the history behind Singapore's success?",
            "__v": 0
          },
          {
            "datePublished": "2024-08-21T05:52:56.889Z",
            "lastUpdated": "2024-08-21T05:54:07.872Z",
            "position": null,
            "likesCount": 0,
            "_id": "66c580fef03eb3004b185378",
            "authorUid": "SIVvOpmfJoNqI0r0YeJCnpUBb7F3",
            "title": "crazy     -webkit-line-clamp: 7; /* Adjust text lines for small screens */      -webkit-line-clamp: 7; /* Adjust text lines for small screens */",
            "metaTitle": "ahyes",
            "category": "Finance",
            "imageUrl": "https://images.theeconomicjournal.org/image-1724219646086-979691902.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et",
            "__v": 0
          },
          {
            "datePublished": "2024-08-21T05:26:45.972Z",
            "lastUpdated": "2024-08-21T05:27:11.974Z",
            "position": null,
            "likesCount": 0,
            "_id": "66c57aaf4ad1b9004b17abb1",
            "authorUid": "SIVvOpmfJoNqI0r0YeJCnpUBb7F3",
            "title": "balls",
            "metaTitle": "balls",
            "category": "Finance",
            "imageUrl": "https://images.theeconomicjournal.org/image-1724218030476-305984104.png",
            "summary": "nice",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T17:26:04.285Z",
            "lastUpdated": "2024-08-17T17:26:16.252Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0dd368dfe8e5f20c667a9",
            "authorUid": "000000001",
            "title": "Test Article 14",
            "metaTitle": "test14",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723915573192-766884307.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T17:20:45.440Z",
            "lastUpdated": "2024-08-17T17:21:16.327Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0dc0bafba637ef8ee1ffc",
            "authorUid": "000000001",
            "title": "Test Article 13",
            "metaTitle": "test13",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723915273982-56249360.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T17:19:20.567Z",
            "lastUpdated": "2024-08-17T17:19:29.528Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0db9fe82a9f787cc7b258",
            "authorUid": "000000001",
            "title": "Test Article 12",
            "metaTitle": "test12",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723915166293-524100024.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T17:01:41.471Z",
            "lastUpdated": "2024-08-17T17:02:52.338Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d7bbe9c6e24b0ce59d7f",
            "authorUid": "000000001",
            "title": "Test Article 11",
            "metaTitle": "test11",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723914169878-613026531.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:54:45.772Z",
            "lastUpdated": "2024-08-17T16:55:27.934Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d5ff492c726210986dc1",
            "authorUid": "000000001",
            "title": "Test Article 10",
            "metaTitle": "test10",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723913725331-994095874.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:43:12.659Z",
            "lastUpdated": "2024-08-17T16:44:13.763Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d35d85f0f07fe4504917",
            "authorUid": "000000001",
            "title": "Test Article 8",
            "metaTitle": "test8",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723913051456-956872588.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:43:12.659Z",
            "lastUpdated": "2024-08-17T16:46:50.180Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d3f985f0f07fe4504919",
            "authorUid": "000000001",
            "title": "Test Article 9",
            "metaTitle": "test9",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723913207040-835080526.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:41:58.119Z",
            "lastUpdated": "2024-08-17T16:42:26.257Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d2f11f1d384034f3589b",
            "authorUid": "000000001",
            "title": "Test Article 7",
            "metaTitle": "test7",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723912943186-981864054.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:39:55.387Z",
            "lastUpdated": "2024-08-17T16:40:18.622Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d272d759683094d49ffd",
            "authorUid": "000000001",
            "title": "Test Article 6",
            "metaTitle": "test6",
            "category": "Business",
            "imageUrl": "https://images.derpdevstuffs.org/image-1723912813176-335489479.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:32:48.198Z",
            "lastUpdated": "2024-08-17T16:33:10.282Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d0c4d14cd50b1cedc65e",
            "authorUid": "000000001",
            "title": "Test Article 3",
            "metaTitle": "test3",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723912387442-777922547.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:32:48.198Z",
            "lastUpdated": "2024-08-17T16:38:30.617Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d206d14cd50b1cedc660",
            "authorUid": "000000001",
            "title": "Test Article 4",
            "metaTitle": "test4",
            "category": "Business",
            "imageUrl": "https://images.derpdevstuffs.org/image-1723912708800-7977763.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T16:32:48.198Z",
            "lastUpdated": "2024-08-17T16:39:31.332Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0d242d14cd50b1cedc662",
            "authorUid": "000000001",
            "title": "Test Article 5",
            "metaTitle": "test5",
            "category": "Business",
            "imageUrl": "https://images.derpdevstuffs.org/image-1723912769472-718371016.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          },
          {
            "datePublished": "2024-08-17T15:18:19.896Z",
            "lastUpdated": "2024-08-20T15:01:18.871Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0bf7d806a8c004a9e202d",
            "authorUid": "000000001",
            "title": "Test Article 2",
            "metaTitle": "test2",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723907963677-941544578.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 31
          },
          {
            "datePublished": "2024-08-17T08:57:07.427Z",
            "lastUpdated": "2024-08-17T15:17:50.532Z",
            "position": 1,
            "likesCount": 0,
            "_id": "66c0bf1c3b78ad005e17f3ad",
            "authorUid": "000000001",
            "title": "Test Article 1",
            "metaTitle": "test1",
            "category": "Business",
            "imageUrl": "https://images.theeconomicjournal.org/image-1723907866733-451999537.png",
            "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed eros eu dui hendrerit congue. Vestibulum eu ullamcorper lacus. Nulla ex quam, egestas vitae placerat quis, condimentum eu ipsum. Sed in gravida nunc. Nulla vehicula ac urna eget tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend suscipit risus, non laoreet tellus convallis et.",
            "__v": 0
          }
        ];
        
        setAPIData((posts as any));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={style.pageWrap}>
      <Body>
        <div className={style.PostAreaWrap}>
          <div className={style.PostArea}>
            <MainColumn article={apiData[0] || ""} />

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>
              <SubColumnWithImage article={apiData[1] || ""} />

              {/* <div className={style.ContentSeparator}></div> */}

              <SubColumn article={apiData[2] || ""} />

              {/* <div className={style.ContentSeparator}></div> */}

              <SubColumn article={apiData[3] || ""} />
            </div>

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>
              <SubColumn article={apiData[4] || ""} />

              {/* <div className={style.ContentSeparator}></div> */}

              <SubColumn article={apiData[5] || ""} />

              {/* <div className={style.ContentSeparator}></div> */}

              <SubColumnWithImage article={apiData[6] || ""} />
            </div>
          </div>
        </div>
      </Body>

      <div className={style.SectionDivider}></div>

      <div className={style.TrendingWrap}>
        <div className={style.TrendingTitleWrap}>
          <TrendingTitleDecoration />
          <h1>Trending</h1>
          <TrendingTitleDecoration />
        </div>

        <div className={style.TrendingContentWrap}>
          <div className={style.TrendingPost}>
            <img
              src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
              alt=""
            />

            <div className={style.TrendingTextWrap}>
              <h5>f/e/b/e/i/p</h5>
              <h4>Lorem ipsum dolor sit amet, consectetur</h4>
              <h6>
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                malesuada.
              </h6>
            </div>
          </div>

          <div className={style.TrendingPost}>
            <img
              src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
              alt=""
            />

            <div className={style.TrendingTextWrap}>
              <h5>f/e/b/e/i/p</h5>
              <h4>Lorem ipsum dolor sit amet, consectetur</h4>
              <h6>
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                malesuada.
              </h6>
            </div>
          </div>

          <div className={style.TrendingPost}>
            <img
              src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
              alt=""
            />

            <div className={style.TrendingTextWrap}>
              <h5>f/e/b/e/i/p</h5>
              <h4>Lorem ipsum dolor sit amet, consectetur</h4>
              <h6>
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                malesuada.
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={style.SectionDivider}></div> */}
    </div>
  );
}

export default HomePage;