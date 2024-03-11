

import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { HomePageStyled, LPToolbarContainer } from "./style";
import { Avatar, List, Tabs, Typography } from "antd";

import { Element, scroller } from 'react-scroll';
import Image from "next/image";

const { Paragraph, Title } = Typography;

const tabs = ['รายละเอียด', 'หลักสูตรแผนการเรียนรู้']
const elementSections = ['description', 'contents']


const data = Array.from({ length: 30 }, (_, i) => ({ title: `Ant Design Title ${i + 1}` }))

const LearningPathEnrollmentDetailPage: FunctionComponent = () => {

    const tabRef = useRef<HTMLDivElement>(null)
    const descriptionSectionRef = useRef<HTMLDivElement>(null);
    const curriculumSectionRef = useRef<HTMLDivElement>(null);

    const isIgnoreListeningScrollEvent = useRef(true);
    const [currentTabKey, setCurrentTabKey] = useState("0");


    const [isTransformToNavBar, setIsTransformToNavBar] = useState(false);

    const onChangeTab = (activeKey: string) => {
        isIgnoreListeningScrollEvent.current = true

        const index = Number(activeKey);
        const elementName = elementSections[index];

        const offset = index === 0 ? -100 : -170
        setCurrentTabKey(activeKey)
        // console.log("scorll")
        scroller.scrollTo(elementName, {
            duration: 500,
            delay: 50,
            smooth: true,
            offset,
        })

        setTimeout(() => {
            isIgnoreListeningScrollEvent.current = false;
        }, 500)
    }

    const handleEventScrollWindow = useCallback((event: Event) => {
        console.log("event: ", event)
        if (tabRef && tabRef.current) {
            const tabScrollY = tabRef.current.getBoundingClientRect().y;
            const isTransform = tabScrollY < 20;
            setIsTransformToNavBar(isTransform);
        }


        if (descriptionSectionRef && descriptionSectionRef.current && !isIgnoreListeningScrollEvent.current) {
            const bounding = descriptionSectionRef.current.getBoundingClientRect()
            const { y: sectionScrollY } = bounding;
            if (sectionScrollY > 30) setCurrentTabKey('0')
        }


        if (curriculumSectionRef && curriculumSectionRef.current && !isIgnoreListeningScrollEvent.current) {
            const bounding = curriculumSectionRef.current.getBoundingClientRect();
            const { y: sectionScrollY } = bounding;

            if (sectionScrollY < 120) setCurrentTabKey('1')
        }
    }, [tabRef, descriptionSectionRef, curriculumSectionRef, isIgnoreListeningScrollEvent])


    useEffect(() => {
        window.addEventListener('scroll', handleEventScrollWindow)
        return () => {
            window.removeEventListener('scroll', handleEventScrollWindow, false)
        }

    }, [handleEventScrollWindow])



    return (
        <HomePageStyled $isToolbar={isTransformToNavBar}>
            <Image alt="content" width={1260} height={750} className="image-content" src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            <div ref={tabRef}>
                <Element name="navbar">
                    <LPToolbarContainer className={`${isTransformToNavBar && 'tab-shadow'}`} $isToolbar={isTransformToNavBar}>
                        <div className={`tab-body ${isTransformToNavBar && 'tab-container'}`}>
                            <Title level={3} className={`${isTransformToNavBar ? 'title-bar' : 'title'}`}>Deep Learning Specialization</Title>
                            <Tabs
                                rootClassName="tab-root-body"
                                defaultActiveKey="0"
                                activeKey={currentTabKey}
                                items={tabs.map((name, i) => {
                                    const id = String(i);
                                    return {
                                        label: name,
                                        key: id,
                                        children: <div style={{ height: 0 }}></div>
                                    };
                                })}
                                onChange={onChangeTab}
                            />
                        </div>
                    </LPToolbarContainer>
                </Element>
            </div>

            <Element name={elementSections[0]} >
                <Paragraph >
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

                    Where does it come from?
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </Paragraph>
            </Element>
            {/* </div> */}
            <div ref={curriculumSectionRef}>
                <Element name={elementSections[1]}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    />
                </Element>
            </div>
        </HomePageStyled>

    )
}

export default LearningPathEnrollmentDetailPage