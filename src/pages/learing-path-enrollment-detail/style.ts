import styled from 'styled-components';


export const AnimationSection = styled.div`
    -webkit-transition: all 0.4s ease-out;
    -moz-transition: all 0.4s ease-out;
    -o-transition: all 0.4s ease-out;
    -ms-transition: all 0.4s ease-out;
    transition: all 0.4s ease-out;
`

export const HomePageStyled = styled.div<{ $isToolbar: boolean}>`
    max-width: 789px;
    margin: 0px auto;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 16px;
    padding: 20px 10px;
    

    .image-content {
        width: 100%;
        height: 300px;
        border-radius: 5px;
        object-fit: cover;
    }

    .ant-tabs-content-holder {
        display: none;
        height: 0px;
        
    }

    .tab-shadow {
        box-shadow: 0px 25px 20px -20px rgba(0, 0, 0, 0.45);
    }
    
`

export const ExtensionSection = styled(AnimationSection)<{ $isShow: boolean}>`
    height: ${props => props.$isShow ? '122px': '0px'};
`

export const LPToolbarContainer = styled(AnimationSection)<{ $isToolbar: boolean}>`
    width: 100%;
    display: flex;
    flex-direction: column;
    transform-origin: top;

    
    position: ${(props) => props.$isToolbar ? 'fixed': 'relative'};
    background-color: ${(props) => props.$isToolbar ? '#ffffff': 'transparent'};
    border-bottom: ${(props) =>  props.$isToolbar ? '2px solid #9ca3af': 'none'};
    z-index: 99;
    top: 0px;
    left: 0px;

    .tab-body {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    .tab-container {
        width: 789px;
        margin: 0px auto;
        margin-bottom: 0px;
        padding: 12px 0px 0px 0px;
    }

    .tab-root-body {
        margin: 0px;
        padding: 0px;
        height: 48px;
    }


    .title {
        display: none;
        
    }

    .title-bar {
        display: block;
        
    }
`

// export default HomePageStyled