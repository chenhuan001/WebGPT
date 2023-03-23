
import { Input, Spin } from 'antd';
import React, { useState, useContext, useReducer, useEffect, useCallback, useRef } from 'react'
import '../myChat/mychat.css'
import apis from '../util/api/api'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';// 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from 'rehype-raw'// 解析标签，支持html语法
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 代码高亮
import 'github-markdown-css';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'


const { TextArea } = Input;
const AppContext = React.createContext({});
let initState = {
    loading: false,
    sessionList: [],
    robotIsSaying: false
}
const myReducer = (state, action) => {
    if (action.type == 'session') {
        console.log(state, action)
    }
    switch (action.type) {
        case 'loading':
            return { ...state, loading: action.isLoading }
        case 'session':
            return { ...state, sessionList: action.sessionList }
        case 'botsaying':
            return { ...state, robotIsSaying:action.botSayingState}
    }
}
const SessionList = () => {
    let { state, dispatch } = useContext(AppContext)
    const scrollBottom = useRef(null)
    const scrollToBottom = () => {
        if (scrollBottom && scrollBottom.current) {
            scrollBottom.current.scrollIntoView(false);
        }
    }
    useEffect(() => {
        scrollToBottom()
    }, [state])
    return (
        <div className='content-manage' ref={scrollBottom}>
            {state.sessionList.map((item, index) => {
                if (item.type == 'user') {
                    return (
                        <div key={index} className='user'>
                            <div> <img src='https://sjt-shangcheng.oss-cn-hangzhou.aliyuncs.com/business-school/909b64733a334048af36b61836bd0d8c.jpeg' className='user-img'></img> </div>
                            <div className='context'>{item.content}</div>
                        </div>
                    )
                } else if (item.type == 'bot') {
                    return (
                        <div key={index} className='bot'>
                            <div> <img src='https://sjt-shangcheng.oss-cn-hangzhou.aliyuncs.com/business-school/27cf4a3043c7405ab4a252f239dd41a5.jpg' className='user-img'></img> </div>
                            <ReactMarkdown className='markdown-body'
                                children={item.content}
                                remarkPlugins={[remarkGfm, { singleTilde: false }]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                children={String(children).replace(/\n$/, '')}
                                                style={tomorrow}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            />
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}/>
                        </div>
                    )
                }
            })}
        </div>
    )
}
const UserInput = () => {
    let [val, setVal] = useState('')
    let { state, dispatch } = useContext(AppContext)
    let botSayTime = null
    const inputText = useRef(null)
    useEffect(()=>{
        inputText.current.focus()
    },[])
    const botSay = (list,content) =>{
        let index = 0;
        botSayTime = setInterval(()=>{
            index++;
            let newList = [...list]
            newList.push({
                type: 'bot',
                content: content.substring(0,index)
            })
            dispatch({ type: 'session', sessionList: newList });
            if(index == content.length){
                clearTimeout(botSayTime);
                dispatch({ type: 'botsaying', botSayingState: false })
            }
        },80)
        
    }
    const commit = (e) => {
        e.preventDefault();
        if (state.robotIsSaying) {
            return;
        }
        let newSessionList = [...state.sessionList];
        newSessionList.push({
            type: 'user',
            content: val
        })
        dispatch({ type: 'session', sessionList: newSessionList });
        setVal('')
        dispatch({ type: 'loading', isLoading: true })
        console.log(state.loading, 'sessionsession')
        apis.commit({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: val
            }
            ]
        }).then(res => {
            dispatch({ type: 'loading', isLoading: false })
            let newSessionListFromBot = [...newSessionList];
            dispatch({ type: 'botsaying', botSayingState: true })
            console.log(res, 'res')
            botSay(newSessionListFromBot,res.data.content)
            // newSessionListFromBot.push({
            //     type: 'bot',
            //     content: res.data.content
            // })
            // dispatch({ type: 'session', sessionList: newSessionListFromBot });
        })
    }
    return (
        <div className='user-input'>
            <TextArea autoSize={true} ref={inputText} onPressEnter={commit} value={val} onChange={(e) => { setVal(e.currentTarget.value) }}></TextArea>
        </div>
    )
}
const MySpin = () => {
    let { state, dispatch } = useContext(AppContext);
    return (
        <div className='loading'>
            <Spin spinning={state.loading} />
        </div>
    )
}
const MyChat = () => {
    let [state, dispatch] = useReducer(myReducer, initState)
    return (
        <div>
            <AppContext.Provider value={{
                state,
                dispatch
            }}>
                <SessionList></SessionList>
                <MySpin />
                <UserInput></UserInput>
            </AppContext.Provider>
        </div>
    )
}
export default MyChat