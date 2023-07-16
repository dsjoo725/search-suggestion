import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
    /* Colors */
    --black-color:#1F2631;
    --skyblue-color:#CAE9FF;
    --blue-color:#007BE9;
    --white-color:#FFFFFF;
    --gray-color:#B4B1BB;
}

body {
    margin: 0;
    padding: 0;
    font-family: 'Spoqa Han Sans Neo';
    color: var(--black-color);
}
`;

export default GlobalStyle;
