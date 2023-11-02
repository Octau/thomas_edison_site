import colors from 'common/styles/colors';
import { mantineColors } from 'common/styles/default-colors';

export default `
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
#__next{
background-color:#D0EBFF;
}

html {
  font-family: Inter, Segoe UI, 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif;
  font-size: 16px;
  clear: both;
  box-shadow: none;
  overflow: hidden;
}
#__next > div:first-of-type {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: darkgrey transparent;
}
*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
*::-webkit-scrollbar-track {
  background: none;
  border-radius: 50%;
}
*::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 24px;
}

.no-scrollbar::-webkit-scrollbar{
  width: 0;
  height: 0;
}

*::before {
  box-sizing: border-box;
}
*::after {
  box-sizing: border-box;
}
ul[class] {
  margin: 0;
  list-style: none;
}
ol[class] {
  margin: 0;
  list-style: none;
}
body {
  max-width: 100vw;
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: initial;
  margin: 0;
}
body > div#__next {
  min-height: 100vh;
}
figure {
  margin: 0;
}
blockquote {
  margin: 0;
}
dl {
  margin: 0;
}
dd {
  margin: 0;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}
img {
  max-width: 100%;
  display: block;
}
input {
  font: inherit;
}
button {
  font: inherit;
}
textarea {
  font: inherit;
}
select {
  font: inherit;
}
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.ck-editor__editable {
  min-height: 300px;
}

.rdw-editor-main, .rdw-editor-toolbar {
  border: 1px solid #c4c4c4 !important;
  padding: 8px;
}

.rdw-editor-main {
  min-height: 300px;
}

.before-border::before{
  content : '';
  border-left: 0.5px solid white;
  // margin-left : 8px;

    
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition:  all 200ms ease-out;
}

.before-border-active::before{
  content : '';
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition:  all 200ms ease-out;
}

.table-component::-webkit-scrollbar-track {
  background-color: ${colors.dividerStrong};
  width: 4px;
  border-radius: 0px;
}

.table-component::-webkit-scrollbar {
  width: 4px;
}

.table-component::-webkit-scrollbar-thumb {
  background-color: ${colors.dividerStrong};
}

.side-navigation-container::-webkit-scrollbar-thumb{
  background-color : ${colors.dividerStrong};
}

.--aggregate {
  background-color: #F0EDFE;
  font-weight: 600;
  border-top: none;
}

.tableexport-string:nth-child(4)>span{
  color:${mantineColors()};
}

tr>.--green:nth-child(5){
  color:#3AA76D;
}

tr>.--red:nth-child(5){
  color:#D44333;
}

.mb16{
  margin-bottom: 16px;
}
`;
