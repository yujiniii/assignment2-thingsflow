# 게시판 관리 RESTful API 서버

- [게시판 관리 RESTful API 서버](https://my-node-project-2.ue.r.appspot.com/api-docs/)가 오픈되었습니다!

**22.09.06 ~ 22.09.07**   

원티드 백엔드 프리온보딩 2차 과제입니다. `backend`

## 🌱 서비스 개요
일정한 요구사항을 만족하는 REST API 서버 개발을 목적으로 하였습니다

- 사용자는 이모지와 현재 날씨가 포함된 게시글을 올릴 수 있습니다.
- 사용자는 게시글을 올릴 때 비밀번호(영숫자 혼합, 6자 이상) 를 설정할 수 있습니다. 
- 본인이 작성한 게시물은 비밀번호 입력 후 수정, 삭제할 수 있습니다.
- 게시글은 최근 순으로 보여지고, 되도록이면 페이지네이션을 이용해주세요

### ERD
![image](https://user-images.githubusercontent.com/50348197/188912891-6d5a37c9-1089-4655-9b13-3efe717747f6.png)
각 모델간의 관계는 위 사진과 같습니다.
한 사용자는(users)는 여러 명의 입사지원한 사용자(posts)를 작성할 수 있습니다.

### 기술 스택
`nodejs` `express.js` `sequelize` `mySql` `swagger`

### 폴더 구조
```.
├── README.md
├── components
│   ├── posts
│   │   ├── postApi.js 
│   │   ├── postService.js
│   └── users
│   │   ├── postApi.js
│   │   ├── postService.js
├── models
│   │   ├── index.js
│   │   ├── post.model.js
│   │   ├── user.model.js
├── config
│   │   ├── config.js
├── swagger
│   │   ├── swagger.js
│   │   ├── swagger-output.js
├── .gitignore
├── .gcloudignore
├── .gitattributes
├── app.yaml 
├── www.js
├── index.js
├── package-lock.json
└── package.json
```


## 💡 요구사항 구현 내용

[POSTMAN](https://documenter.getpostman.com/view/19606295/VVBTVT6i)
#### 사용자 등록
![image](https://user-images.githubusercontent.com/50348197/188913179-4da6bcfe-7034-41bd-97bb-c823748e6ab1.png)

### 게시글 등록
![image](https://user-images.githubusercontent.com/50348197/188913323-51651bc9-de64-4367-a308-e5f33101d2af.png)

### 게시글 조회
![image](https://user-images.githubusercontent.com/50348197/188913494-b5a080d6-c7ba-4c97-9a9a-e4fdd5b35914.png)

### 게시글 수정
![image](https://user-images.githubusercontent.com/50348197/188914302-b9ef1e06-9e5a-4f82-bf29-b108c2f7091f.png)
![image](https://user-images.githubusercontent.com/50348197/188914211-07e97e12-c9f7-4ae2-a93c-364ebcd0f2eb.png)

### 게시글 삭제
![image](https://user-images.githubusercontent.com/50348197/188914935-9d5c481e-7f01-4aa9-a498-a429a263d0fe.png)


## 🛠 실행 방법 정리
```
npm install
```
  
``` 
npm start 
npm run dev // 개발자용
npm run swagger // swagger용
```


## 커밋 컨벤션
`fix:` 버그가 발생해 코드를 고칠 때     
`feat:` 기능을 추가할 때  
`chore:` 설정 변경 발생시(단순오타 등은 refactor 😊)     
`docs:` 문서 수정(마크다운 파일, swagger doc 등)     
`comment:` 주석 추가   
`refactor:` 코드의 기능변화 없이 수정할 때   
  
 ## JSDoc 사용
 **예시)**
 ```js
 /**
 * @description 유저의 게시글 수정, 삭제 권한을 확인합니다.
 * @param {string} userRole 유저의 권한
 * @param {number} expectedUserId 현재 접속한 유저의 id
 * @param {number} actualUserId 게시글을 작성한 유저의 id
 * @throws {ForbiddenError} 유저는 해당 게시글 수정, 삭제 권한이 없음
 * @returns {boolean} 게시글 수정, 삭제 권한을 확인 결과
 */
 ```
