(function(){"use strict";var e={2422:function(e,t,a){var n=a(5130),l=a(6768);const o={id:"app"},s={class:"header"};function c(e,t,a,n,c,i){const r=(0,l.g2)("router-link"),d=(0,l.g2)("router-view");return(0,l.uX)(),(0,l.CE)("div",o,[(0,l.Lk)("header",s,[(0,l.bF)(r,{class:"header-link",to:"/"},{default:(0,l.k6)((()=>t[0]||(t[0]=[(0,l.eW)("首页")]))),_:1}),(0,l.bF)(r,{class:"header-link",to:"/create-resume"},{default:(0,l.k6)((()=>t[1]||(t[1]=[(0,l.eW)("创建简历")]))),_:1})]),(0,l.bF)(d,{class:"router-view"})])}var i={name:"App"},r=a(1241);const d=(0,r.A)(i,[["render",c]]);var u=d,p=a(1387);const m={class:"home"},v={class:"session1"},f={class:"session2"},b={class:"session2-icon-content"},h=["src"],k=["src"],g=["src"],y={class:"session3"},C={class:"session3-button-content"},L={class:"session3-button"},x=["src"],_={class:"session3-button"},E=["src"],I={class:"session3-button"},S=["src"];function T(e,t,a,n,o,s){const c=(0,l.g2)("router-link");return(0,l.uX)(),(0,l.CE)("div",m,[(0,l.Lk)("div",v,[t[1]||(t[1]=(0,l.Fv)('<h1 class="home-title" data-v-d7ff490c>欢迎使用<span class="home-title-highlight" data-v-d7ff490c>简历生成器</span>！</h1><p class="home-description" data-v-d7ff490c> 该工具帮助用户轻松<span class="home-title-highlight" data-v-d7ff490c>创建专业简历</span>，输入个人信息、教育背景和工作经历，自动生成<span class="home-title-highlight" data-v-d7ff490c>美观简历</span>，助您求职成功！ </p>',2)),(0,l.bF)(c,{to:"/resume-form"},{default:(0,l.k6)((()=>t[0]||(t[0]=[(0,l.Lk)("button",{class:"create-resume-button"},"创建简历 🎉",-1)]))),_:1})]),(0,l.Lk)("div",f,[(0,l.Lk)("div",b,[(0,l.Lk)("img",{src:o.imChatConversationIcon,alt:"im-chat-conversation-1 图标",class:"session2-icon"},null,8,h),(0,l.Lk)("img",{src:o.arrowIcon,alt:"arrow-142 图标",class:"arrow-icon"},null,8,k),(0,l.Lk)("img",{src:o.formIcon,alt:"form-7 图标",class:"session2-icon"},null,8,g)]),t[2]||(t[2]=(0,l.Lk)("h2",{class:"session2-title"}," 通过对话 ",-1)),t[3]||(t[3]=(0,l.Lk)("div",{class:"session2-description"}," 我们会通过对话的方式，与您沟通简历内容，并生成简历。我们的系统会根据您提供的信息，自动生成一份专业的简历，确保您的简历在求职过程中脱颖而出。无论是教育背景、工作经历还是个人技能，我们都会为您精心编排，打造一份完美的简历，助您在职场中取得成功。 ",-1))]),(0,l.Lk)("div",y,[t[10]||(t[10]=(0,l.Lk)("div",{class:"session3-title-content"},[(0,l.Lk)("div",{class:"session3-title"},"我们会处理困难的事情"),(0,l.Lk)("div",{class:"session3-title-sub"},"通过以下三种方式生成简历：对话沟通、导入文件、使用模版。")],-1)),(0,l.Lk)("div",C,[(0,l.Lk)("div",L,[(0,l.Lk)("img",{src:o.createResumeIcon,alt:"form-7 图标",class:"session3-icon"},null,8,x),t[4]||(t[4]=(0,l.Lk)("div",{class:"session3-button-title"},"创建简历",-1)),t[5]||(t[5]=(0,l.Lk)("div",{class:"session3-button-description"},"通过对话的方式，与您沟通简历内容，并生成简历",-1))]),(0,l.Lk)("div",_,[(0,l.Lk)("img",{src:o.importResumeIcon,alt:"form-7 图标",class:"session3-icon"},null,8,E),t[6]||(t[6]=(0,l.Lk)("div",{class:"session3-button-title"},"导入简历",-1)),t[7]||(t[7]=(0,l.Lk)("div",{class:"session3-button-description"},"通过导入已有的简历文件，系统会自动解析并生成一份新的简历，帮助您节省时间和精力。",-1))]),(0,l.Lk)("div",I,[(0,l.Lk)("img",{src:o.modelIcon,alt:"form-7 图标",class:"session3-icon"},null,8,S),t[8]||(t[8]=(0,l.Lk)("div",{class:"session3-button-title"},"简历模版",-1)),t[9]||(t[9]=(0,l.Lk)("div",{class:"session3-button-description"},"通过简历模版，您可以快速生成一份专业的简历，节省时间并确保简历的质量和美观度。",-1))])])])])}var A={name:"HomePage",data(){return{imChatConversationIcon:a(8677),formIcon:a(8158),arrowIcon:a(2923),createResumeIcon:a(3700),importResumeIcon:a(5482),modelIcon:a(5250)}}};const w=(0,r.A)(A,[["render",T],["__scopeId","data-v-d7ff490c"]]);var j=w;const X={class:"scroll-container"},F={class:"container"},M={id:"education-experience",class:"education-list"},O={class:"card"},K={id:"work-experience",class:"experience-list"},P={class:"card"},R={id:"project-experience",class:"project-list"},N={class:"card"},B={id:"template-area",style:{display:"none"}},J={id:"education-card-template",class:"card"},$={id:"work-card-template",class:"card"},q={id:"project-card-template",class:"card"};function G(e,t,a,n,o,s){return(0,l.uX)(),(0,l.CE)("div",X,[(0,l.Lk)("div",F,[t[13]||(t[13]=(0,l.Fv)('<h1 class="title" data-v-63b65f20>你好，欢迎来到 AI 简历君</h1><p class="subtitle" data-v-63b65f20>在开始为您创建 AI 智能简历前，请先完善以下基础信息：</p><div class="form-group" data-v-63b65f20><label class="form-label" for="name" data-v-63b65f20> 姓名<span class="required" data-v-63b65f20>*</span></label><input type="text" id="name" class="form-input" placeholder="请输入您的姓名" required value="Tim" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" for="phone" data-v-63b65f20>手机号 (选填)</label><input type="tel" id="phone" class="form-input" placeholder="请输入您的手机号" value="13800000000" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" for="email" data-v-63b65f20>邮箱 (选填)</label><input type="email" id="email" class="form-input" placeholder="请输入您的邮箱" value="tim@example.com" data-v-63b65f20></div><div class="block-title" data-v-63b65f20>教育经历</div>',6)),(0,l.Lk)("div",M,[(0,l.Lk)("div",O,[(0,l.Lk)("button",{class:"remove-btn",type:"button",onClick:t[0]||(t[0]=e=>s.removeCard(e))}," × "),t[10]||(t[10]=(0,l.Fv)('<div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>学校名</label><input type="text" class="form-input" placeholder="如：北京大学" value="清华大学" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>时间</label><input type="text" class="form-input" placeholder="如：2018.09 - 2022.06" value="2016.09 - 2020.06" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>专业</label><input type="text" class="form-input" placeholder="如：计算机科学" value="软件工程" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>学历</label><input type="text" class="form-input" placeholder="如：本科 / 硕士 / 博士" value="本科" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>GPA (选填)</label><input type="text" class="form-input" placeholder="如：3.8" value="3.9" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>城市</label><input type="text" class="form-input" placeholder="如：北京" value="上海" data-v-63b65f20></div>',6))])]),(0,l.Lk)("div",null,[(0,l.Lk)("button",{class:"add-button",type:"button",onClick:t[1]||(t[1]=(...e)=>s.addEducationExperience&&s.addEducationExperience(...e))}," + 新增教育经历 ")]),t[14]||(t[14]=(0,l.Lk)("div",{class:"block-title"},"工作经历",-1)),(0,l.Lk)("div",K,[(0,l.Lk)("div",P,[(0,l.Lk)("button",{class:"remove-btn",type:"button",onClick:t[2]||(t[2]=e=>s.removeCard(e))}," × "),t[11]||(t[11]=(0,l.Fv)('<div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>公司名</label><input type="text" class="form-input" placeholder="如：腾讯" value="阿里巴巴" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>时间</label><input type="text" class="form-input" placeholder="如：2020.05 - 2022.12" value="2020.07 - 2023.01" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>职位</label><input type="text" class="form-input" placeholder="如：后端开发" value="全栈工程师" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>城市</label><input type="text" class="form-input" placeholder="如：深圳" value="北京" data-v-63b65f20></div>',4))])]),(0,l.Lk)("div",null,[(0,l.Lk)("button",{class:"add-button",type:"button",onClick:t[3]||(t[3]=(...e)=>s.addWorkExperience&&s.addWorkExperience(...e))}," + 新增工作经历 ")]),t[15]||(t[15]=(0,l.Lk)("div",{class:"block-title"},"项目经历",-1)),(0,l.Lk)("div",R,[(0,l.Lk)("div",N,[(0,l.Lk)("button",{class:"remove-btn",type:"button",onClick:t[4]||(t[4]=e=>s.removeCard(e))}," × "),t[12]||(t[12]=(0,l.Fv)('<div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>项目名</label><input type="text" class="form-input" placeholder="如：AI 简历系统" value="智能推荐系统" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>时间</label><input type="text" class="form-input" placeholder="如：2021.02 - 2021.04" value="2021.05 - 2021.11" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>职位/角色</label><input type="text" class="form-input" placeholder="如：产品负责人" value="项目经理" data-v-63b65f20></div>',3))])]),(0,l.Lk)("div",null,[(0,l.Lk)("button",{class:"add-button",type:"button",onClick:t[5]||(t[5]=(...e)=>s.addProjectExperience&&s.addProjectExperience(...e))}," + 新增项目经历 ")]),(0,l.Lk)("button",{class:"submit-btn",type:"button",onClick:t[6]||(t[6]=(...e)=>s.handleSubmit&&s.handleSubmit(...e))}," 开始创建我的简历 ")]),(0,l.Lk)("div",B,[(0,l.Lk)("div",J,[(0,l.Lk)("button",{class:"remove-btn",type:"button",onClick:t[7]||(t[7]=e=>s.removeCard(e))},"×"),t[16]||(t[16]=(0,l.Fv)('<div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>学校名</label><input type="text" class="form-input" placeholder="如：北京大学" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>时间</label><input type="text" class="form-input" placeholder="如：2018.09 - 2022.06" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>专业</label><input type="text" class="form-input" placeholder="如：计算机科学" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>学历</label><input type="text" class="form-input" placeholder="如：本科 / 硕士 / 博士" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>GPA (选填)</label><input type="text" class="form-input" placeholder="如：3.8" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>城市</label><input type="text" class="form-input" placeholder="如：北京" data-v-63b65f20></div>',6))]),(0,l.Lk)("div",$,[(0,l.Lk)("button",{class:"remove-btn",type:"button",onClick:t[8]||(t[8]=e=>s.removeCard(e))},"×"),t[17]||(t[17]=(0,l.Fv)('<div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>公司名</label><input type="text" class="form-input" placeholder="如：腾讯" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>时间</label><input type="text" class="form-input" placeholder="如：2020.05 - 2022.12" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>职位</label><input type="text" class="form-input" placeholder="如：后端开发" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>城市</label><input type="text" class="form-input" placeholder="如：深圳" data-v-63b65f20></div>',4))]),(0,l.Lk)("div",q,[(0,l.Lk)("button",{class:"remove-btn",type:"button",onClick:t[9]||(t[9]=e=>s.removeCard(e))},"×"),t[18]||(t[18]=(0,l.Fv)('<div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>项目名</label><input type="text" class="form-input" placeholder="如：AI 简历系统" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>时间</label><input type="text" class="form-input" placeholder="如：2021.02 - 2021.04" data-v-63b65f20></div><div class="form-group" data-v-63b65f20><label class="form-label" data-v-63b65f20>职位/角色</label><input type="text" class="form-input" placeholder="如：产品负责人" data-v-63b65f20></div>',3))])])])}a(4114),a(8992),a(3949),a(1454),a(2577);var D=a(144);class W{constructor(){if(W.instance)return W.instance;this.data=(0,D.Kh)({education:[],workExperience:[],projectExperience:[],personalInfo:{},personalSummary:""}),W.instance=this}metaDataDescribeForType(e){switch(e){case"education":return"\n        - meta_data 中的 title 是用户的教育经历标题， 不做改动。\n        - meta_data 中的 content 是AI需要通过对话，总结出的教育经历内容（亮点），需总结为2-4点，突出学习成果和相关课程, bullet_point 是总结小标题，content 是总结内容\n        - meta_data 中的 from_time 是用户的入学时间。\n        - meta_data 中的 to_time 是用户的毕业时间。\n        ";case"workExperience":return"\n        - meta_data 中的 title 是用户的工作经历标题, 不做改动。\n        - meta_data 中的 content 是AI需要通过对话，总结出的工作经历内容（亮点），需总结为2-4点，强调职责、成就和量化成果, bullet_point 是总结小标题，content 是总结内容\n        - meta_data 中的 from_time 是用户的入职时间。\n        - meta_data 中的 to_time 是用户的离职时间。\n        ";case"projectExperience":return"\n        - meta_data 中的 title 是用户的项目经历标题，不做改动。\n        - meta_data 中的 content 是AI需要通过对话，总结出的项目经历内容（亮点），需总结为2-4点，突出项目目标、所用技术和取得的成果, bullet_point 是总结小标题，content 是总结内容\n        - meta_data 中的 from_time 是项目开始时间。\n        - meta_data 中的 to_time 是项目结束时间。\n        ";case"personalInfo":return"\n        - meta_data 中的 name 是用户姓名，你需要根据用户的对话，总结出name的内容，是用户的姓名。\n        - meta_data 中的 email 是用户邮箱，你需要根据用户的对话，总结出email的内容，是用户的邮箱。\n        - meta_data 中的 phone 是用户的联系电话，你需要根据用户的对话，总结出phone的内容，是用户的联系电话。\n        ";case"personalSummary":return"\n        - meta_data 中的 content 是用户填写的个人总结，你需要根据用户的对话，总结出content的内容，是用户的个人总结。\n        - meta_data 中的 skills 是用户的技能列表，你需要根据用户的对话，总结出skills的内容，是用户的技能。\n        ";default:return""}}formatForType(e){switch(e){case"education":case"workExperience":case"projectExperience":return JSON.stringify({title:"",from_time:"",to_time:"",content:[{bullet_point:"总结小标题1",content:"总结内容1"},{bullet_point:"总结小标题2",content:"总结内容2"},{bullet_point:"总结小标题3",content:"总结内容3"}]});case"personalInfo":return JSON.stringify({name:"",email:"",phone:""});case"personalSummary":default:return"{}"}}contentForType(e,t=null){switch(e){case"education":return t?this.data.education.find((e=>e.title===t)):this.data.education;case"workExperience":return t?this.data.workExperience.find((e=>e.title===t)):this.data.workExperience;case"projectExperience":return t?this.data.projectExperience.find((e=>e.title===t)):this.data.projectExperience;case"personalInfo":return this.data.personalInfo;case"personalSummary":return this.data.personalSummary;default:return null}}setContentForType(e,t,a=null){switch(e){case"education":if(a){const e=this.data.education.find((e=>e.title===a));e?e.content=t:this.data.education.push({title:a,content:t})}else this.data.education.push({content:t});break;case"workExperience":if(a){const e=this.data.workExperience.find((e=>e.title===a));e?e.content=t:this.data.workExperience.push({title:a,content:t})}else this.data.workExperience.push({content:t});break;case"projectExperience":if(a){const e=this.data.projectExperience.find((e=>e.title===a));e?e.content=t:this.data.projectExperience.push({title:a,content:t})}else this.data.projectExperience.push({content:t});break;case"personalInfo":this.data.personalInfo=t;break;case"personalSummary":this.data.personalSummary=t;break;default:break}}setContentForTitle(e,t){const a=["education","workExperience","projectExperience"];for(const n of a){const a=this.data[n];if(a&&Array.isArray(a))for(let n=0;n<a.length;n++)if(a[n].title===e)return void(a[n].content=t)}}}const Q=new W;Object.freeze(Q);var U=Q,V={name:"ResumeForm",methods:{handleSubmit(){const e=document.getElementById("name").value,t=document.getElementById("phone").value,a=document.getElementById("email").value,n=document.getElementById("education-experience").querySelectorAll(".card"),l=Array.from(n).map((e=>{const t=e.querySelectorAll("input");return{school:t[0]?.value||"",time:t[1]?.value||"",major:t[2]?.value||"",degree:t[3]?.value||"",gpa:t[4]?.value||"",city:t[5]?.value||""}})),o=document.getElementById("work-experience").querySelectorAll(".card"),s=Array.from(o).map((e=>{const t=e.querySelectorAll("input");return{company:t[0]?.value||"",time:t[1]?.value||"",title:t[2]?.value||"",city:t[3]?.value||""}})),c=document.getElementById("project-experience").querySelectorAll(".card"),i=Array.from(c).map((e=>{const t=e.querySelectorAll("input");return{projectName:t[0]?.value||"",time:t[1]?.value||"",role:t[2]?.value||""}}));U.setContentForType("personalInfo",{name:e,phone:t,email:a}),l.forEach((e=>{const[t,a]=e.time.split(" - "),n=`${e.school}`;U.setContentForType("education",{title:n,from_time:t?t.trim():"",to_time:a?a.trim():"",content:[]},n)})),s.forEach((e=>{const[t,a]=e.time.split(" - "),n=`${e.company}`;U.setContentForType("workExperience",{title:n,from_time:t?t.trim():"",to_time:a?a.trim():"",content:[]},n)})),i.forEach((e=>{const[t,a]=e.time.split(" - "),n=`${e.projectName}`;U.setContentForType("projectExperience",{title:n,from_time:t?t.trim():"",to_time:a?a.trim():"",content:[]},n)}));const r={name:e,phone:t,email:a,educationList:l,workList:s,projectList:i};localStorage.setItem("resumeFormData",JSON.stringify(r)),this.$router.push("/create-resume")},addEducationExperience(){const e=document.getElementById("education-experience");let t=e.querySelector(".card");if(t){const a=t.cloneNode(!0);this.clearInputs(a),e.appendChild(a)}else{const t=document.getElementById("education-card-template"),a=t.cloneNode(!0);this.clearInputs(a),e.appendChild(a)}},addWorkExperience(){const e=document.getElementById("work-experience");let t=e.querySelector(".card");if(t){const a=t.cloneNode(!0);this.clearInputs(a),e.appendChild(a)}else{const t=document.getElementById("work-card-template"),a=t.cloneNode(!0);this.clearInputs(a),e.appendChild(a)}},addProjectExperience(){const e=document.getElementById("project-experience");let t=e.querySelector(".card");if(t){const a=t.cloneNode(!0);this.clearInputs(a),e.appendChild(a)}else{const t=document.getElementById("project-card-template"),a=t.cloneNode(!0);this.clearInputs(a),e.appendChild(a)}},removeCard(e){const t=e.currentTarget,a=t.closest(".card");a&&a.remove()},clearInputs(e){const t=e.querySelectorAll("input");t.forEach((e=>e.value=""))}}};const H=(0,r.A)(V,[["render",G],["__scopeId","data-v-63b65f20"]]);var Y=H;const z={class:"app"},Z={class:"left-container"};function ee(e,t,a,n,o,s){const c=(0,l.g2)("ChatComponent"),i=(0,l.g2)("SelectModuleComponent"),r=(0,l.g2)("CVComponent");return(0,l.uX)(),(0,l.CE)("div",z,[(0,l.Lk)("div",Z,[""!=o.currentSelectedTitle?((0,l.uX)(),(0,l.Wv)(c,{key:0,modules:s.chatModules,onUpdateResume:s.handleUpdateResume,currentSelectedTitle:o.currentSelectedTitle,onCloseChat:s.handleCloseChat},null,8,["modules","onUpdateResume","currentSelectedTitle","onCloseChat"])):((0,l.uX)(),(0,l.Wv)(i,{key:1,chatModules:s.chatModules,onSelectedModuleChanged:s.handleSelectedModuleChanged},null,8,["chatModules","onSelectedModuleChanged"]))]),(0,l.bF)(r,{highlightTitle:o.currentSelectedTitle,onSelectedModuleChanged:s.handleSelectedModuleChanged},null,8,["highlightTitle","onSelectedModuleChanged"])])}var te=a(4232),ae=a(4373);const ne=function(){let e,t="";function a(){const e=(0,D.Kh)({conversations:{}});function a(t,a){e.conversations[t]||(e.conversations[t]={}),e.conversations[t][a]||(e.conversations[t][a]=[{text:`\n【目标与工作流程】\n●目标：作为一位专业且富有同理心的“AI 简历写作教练”，帮助用户提炼和优化简历中的工作或项目经历，生成 2-4 条高质量简历要点，确保每一条内容简洁、有深度，突出个人贡献、使用的工具/方法以及量化成果。\n\n【对话与输出要求】\n●激励与引导：通过温暖的语气鼓励用户提供更详细的信息，确保他们理解自己的成就并能够充分表达。展现同理心，让用户感到被理解和支持。\n●高质量内容输出：每条简历要点格式为：“简洁总结：详细工作内容 + 量化成果”，并确保每条都突出个人行动、所用工具/方法、以及具体成果。\n●深度挖掘与反馈：当用户的回答过于笼统或缺少量化成果时，提供友好提醒，帮助他们提取更多细节，尤其是量化成果。如果用户无法提供具体数据，建议使用“约X%”等措辞提示他们回想具体成果。\n●避免重复和推测：不要重复询问已获得的信息，避免对用户未提及的内容做推测。如果用户没有提到某些内容，不能自行补充，除非用户主动提供或要求。\n●进展总结与反馈：定期总结目前收集的进展，明确告知用户已收集的内容，帮助他们了解当前对话的状态，确保用户在整个过程中保持积极参与。\n●判断何时输出简历要点：AI 在收集到足够内容后生成简历要点，或者当用户要求时，及时生成。\n\n【具体流程】\n1.确认基础信息：\na.基于已有信息，进一步询问用户在公司中的职责和业务背景。\nb.例如：“能简单描述一下你在这家公司的主要职责吗？如果有团队规模或业务方向的描述，也可以告诉我。”\nc.同理心提示：“我知道你一定有很多工作经历可以分享，我会帮助你把这些亮点挖掘出来，打造出最能展现你个人成就的简历。”\n2.让用户列举亮点：\na.鼓励用户列举 2-3 个想突出的工作亮点或项目。\nb.例如：“在这段经历中，有哪些项目或职责是你特别想强调的？你可以先列出几个，我们逐个深入。”\nc.同理心提示：“我知道有些工作内容可能很复杂，我们会一步步来整理，确保每一项都能完整体现你的贡献。”\n3.深挖工作内容（使用 STAR 法）：\na.对每个亮点进行详细询问，采用 STAR 方法（Situation、Task、Action、Result）来深入了解每个细节。\nb.例如：“你能详细说明一下在这个项目中，你的具体行动是什么？使用了哪些工具或方法？最终的成果如何，是否有量化的成效？”\nc.量化成果引导：“如果你能提供一些量化的成效，比如提升了XX%或者节省了XX小时，会让这段经历更加突出。你能回忆一下是否有类似的数据吗？”\nd.同理心提示：“如果不记得具体数字也没关系，我们可以用‘约XX%’或‘XX小时’来大致表达。”\n4.定期总结进展：\na.每次收集到一部分信息时，总结目前进展，明确告知用户已经获得的信息以及下一步的计划。\nb.例如：“到目前为止，我们已经了解了你负责XX项目，并使用了YY工具来提升ZZ效果。接下来，我们可以继续探讨你在这个项目中的具体贡献，或者如果你觉得信息已经足够，我们可以开始生成简历要点。”\nc.同理心提示：“非常感谢你提供的细节！我们已经收集到了几个关键点，接下来我会帮你整理出清晰且有力的简历要点。”\n5.判断时机输出简历要点：\na.当信息充分（你需要一直保持思考和评判这点是否满足），或者用户主动要求时，生成简历要点。\nb.例如：“根据目前的信息，我们已经足够提炼出几条高质量的简历要点。你希望我们开始输出这些要点吗？”\nc.同理心提示：“如果你觉得内容已经完善了，我会马上帮你整理出简历要点。你可以随时查看，看看这些描述是否准确。”\n6.生成简历要点并标注【content】：\na.根据已收集的内容生成 2-4 条高质量简历要点，格式为：“简洁总结：详细工作内容 + 量化成果”。请确保严格遵循格式，例如：\n*\n●主导跨部门协作：带领10人跨部门团队，通过A/B测试优化推荐算法，成功提升平台用户活跃度20%，提高了用户留存率，并优化了个性化推荐内容的精准度和匹配度，显著提升了用户体验和转化率。\n*\n7.确认与模拟记录：\na.等待用户确认简历要点。\nb.例如：“这些描述符合你的工作内容吗？如果没问题，我们就完成这一段经历的更新。”\nc.当用户确认后，给予积极反馈并结束该段经历的编写：例如：“好的，已完成这段经历的更新！你可以在右侧的简历中查看最终效果，如果以后有需要修改或补充的地方，随时告诉我！”\nd.同理心提示：“谢谢你分享的所有信息！简历已经更新了，如果以后有任何修改或补充，随时告诉我，我会继续帮助你优化！”\n\n-------------------\n【目前已知信息】\n-------------------\n${JSON.stringify(U.contentForType(t,a))}\n-------------------\n【回复格式】\n-------------------\n1. 你的回复「必须」是一个 JSON 对象，且遵循以下结构：  \n{\n  "message": "",\n  "meta_data": {\n      "resumeData": ${U.formatForType(t)}  \n  },\n  "is_enough": true\n}\n2. 除了 JSON 数据外，请不要包含其它内容（不要携带前后缀等）。  \n3. message 字段是给用户看的提示信息, 可以是引导用户继续介绍自己的文案, 注意引用上文信息，你就像循循善诱的老师一样，引导用户继续介绍自己的信息。\n4. 发挥想象力，尽量详尽，体现面试者价值，追问也可以详尽、发散\n5. 以下是对于回复的meta_data的描述: ${U.metaDataDescribeForType(t)}\n6. is_enough 字段是代表AI，觉得信息是否已经足够，如果is enough为true，则代表AI觉得信息已经足够, 之后我的代码逻辑会询问用户是否渲染meta_data. 用户对于is enough为数的情况，其实可以有两种反应，第一种反应是可以接受接受就会渲染另外一种是可以不接受，就是觉得不够的意思的话，我会用非常明确的语言告诉AI用户还觉得不满意，因此需要收集更具体更详尽更准确更为完善的信息才能再次把is enough弄为true.另外当用户自己想要小结对话内容到简历中，如果用户有明确的意向，it's in love必须在下次置为false，然后我需要重新收集信息，直到is_enough为true，然后用户可以小结对话内容到简历中。当然如果用户有明确的意向向AI要求总结简历或者小结的意思，或者希望结束对话,那么下一次的is enough必须为true \n\n`,sender:"system"}])}function n(t,n){return a(t,n),e.conversations[t][n]}function l(t,a,n){e.conversations[t][a].push(n)}async function o(t,a,n){if(!n.trim())return;e.conversations[t][a].push({text:n,sender:"me"});const l=await i(t,a,n);e.conversations[t][a].push({text:l,sender:"gpt"})}function s(t,a){return e.conversations[t][a].map((e=>{let t="system";return"me"===e.sender?t="user":"gpt"===e.sender&&(t="assistant"),{role:t,content:e.text}}))}function c(e){t=e}async function i(e,a,n){const l="https://api.openai.com/v1/chat/completions",o=t||"";try{let t=s(e,a);t.push({role:"user",content:n});const c=await ae.A.post(l,{model:"gpt-4o",messages:t,temperature:.7},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}),i=c.data.choices[0].message.content.trim();return i}catch(c){return console.error("调用 GPT API 出错：",c),"GPT 接口调用失败，请检查 API Key 或稍后重试。"}}return{getMessagesForTitle:n,sendMessage:o,setApiKey:c,addMessage:l}}return{getInstance(){return e||(e=a()),e}}}();var le=ne;const oe={class:"chat-component"},se={class:"api-key-settings"},ce={key:0,class:"gpt-message-container"},ie=["src"],re={class:"message gpt"},de={key:1,class:"message me"},ue={key:2,class:"message system"},pe={key:3,class:"message choice"},me={class:"choice-buttons"},ve=["onClick"],fe={class:"input-area-container"},be={class:"input-area-left"},he=["src"];var ke={__name:"ChatComponent",props:{modules:{type:Array,default:()=>[]},currentSelectedTitle:{type:String,default:""}},emits:["update-resume"],setup(e,{emit:t}){const o=e,s=t,c=le.getInstance(),i=(0,D.KR)("");function r(){c.setApiKey(i.value),localStorage.setItem("openaiApiKey",i.value),alert("已设置 API Key")}(0,l.sV)((()=>{const e=localStorage.getItem("openaiApiKey");e&&(i.value=e,c.setApiKey(e))}));const d=(0,D.KR)(""),u=a(7494),p=a(9444),m=(0,D.KR)(null),v=(0,l.EW)((()=>o.modules.find((e=>e.title===o.currentSelectedTitle))||{type:"",title:""})),f=(0,l.EW)((()=>{const{type:e,title:t}=v.value;return e&&t?c.getMessagesForTitle(e,t):[]}));function b(){const e=d.value.trim();if(!e)return;const{type:t,title:a}=v.value;c.sendMessage(t,a,e),d.value=""}function h(e){try{const t=JSON.parse(e);return t.message||"(未找到 message 字段)"}catch(t){return e}}function k(e){try{const t=JSON.parse(e.text);s("update-resume",t.meta_data),s("close-chat")}catch(t){console.error("choiceMessage.text 不是 JSON",t)}}function g(){const e="我认为总结还不够，请继续对话",{type:t,title:a}=v.value;t&&a?(c.sendMessage(t,a,e),d.value="",console.log("已发送预定义消息给GPT")):console.error("当前未选择有效的模块")}return(0,l.wB)((()=>f.value),(async e=>{if(!e||0===e.length)return;const t=e[e.length-1];if("gpt"===t.sender)try{const e=JSON.parse(t.text);if(e.is_enough){const{type:t,title:a}=v.value;c.addMessage(t,a,{sender:"choice",text:JSON.stringify({meta_data:e.meta_data})})}}catch(a){console.error("GPT 返回消息不是标准 JSON 或解析失败：",a)}await(0,l.dY)(),m.value&&(m.value.scrollTop=m.value.scrollHeight)}),{deep:!0}),(e,t)=>((0,l.uX)(),(0,l.CE)("div",oe,[(0,l.Lk)("div",se,[(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>i.value=e),placeholder:"在此粘贴你的 OpenAI API Key"},null,512),[[n.Jo,i.value]]),(0,l.Lk)("button",{onClick:r},"保存 Key")]),(0,l.Lk)("div",{class:"messages-container",ref_key:"messagesContainer",ref:m},[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(f.value,((e,a)=>((0,l.uX)(),(0,l.CE)("div",{key:a},["gpt"===e.sender?((0,l.uX)(),(0,l.CE)("div",ce,[(0,l.Lk)("img",{src:(0,D.R1)(p),alt:"ChatGPT 头像",class:"chatgpt-message-icon"},null,8,ie),(0,l.Lk)("div",re,[(0,l.Lk)("span",null,(0,te.v_)(h(e.text)),1)])])):"me"===e.sender?((0,l.uX)(),(0,l.CE)("div",de,[(0,l.Lk)("span",null,(0,te.v_)(e.text),1)])):"system"===e.sender?((0,l.uX)(),(0,l.CE)("div",ue,[(0,l.Lk)("span",null,(0,te.v_)(e.text),1)])):"choice"===e.sender?((0,l.uX)(),(0,l.CE)("div",pe,[t[2]||(t[2]=(0,l.Lk)("span",null,"GPT 觉得已经够了，你是否满意？",-1)),(0,l.Lk)("div",me,[(0,l.Lk)("button",{onClick:t=>k(e)},"OK",8,ve),(0,l.Lk)("button",{onClick:g},"我觉得还不够")])])):(0,l.Q3)("",!0)])))),128))],512),(0,l.Lk)("div",fe,[(0,l.Lk)("div",be,[(0,l.bo)((0,l.Lk)("input",{"onUpdate:modelValue":t[1]||(t[1]=e=>d.value=e),placeholder:"给“ChatGPT”发送信息",class:"chatgpt-input",onKeyup:(0,n.jR)(b,["enter"])},null,544),[[n.Jo,d.value]])]),(0,l.Lk)("div",{class:"chatgpt-send-button",onClick:b},[(0,l.Lk)("img",{src:(0,D.R1)(u),alt:"ChatGPT 图标",class:"chatgpt-send-icon"},null,8,he)])])]))}};const ge=(0,r.A)(ke,[["__scopeId","data-v-055e63f0"]]);var ye=ge;const Ce={class:"cv-component"},Le={class:"cv-page"},xe={key:0,class:"name"},_e={key:1,class:"email-phone"},Ee={key:2,class:"education-section"},Ie=["onClick"],Se={class:"title-and-time"},Te={class:"item-title"},Ae={class:"item-time"},we={class:"item-content"},je={class:"bullet-point"},Xe={class:"bullet-content"},Fe={key:3,class:"work-section"},Me=["onClick"],Oe={class:"title-and-time"},Ke={class:"item-title"},Pe={class:"item-time"},Re={class:"item-content"},Ne={class:"bullet-point"},Be={class:"bullet-content"},Je={key:4,class:"project-section"},$e=["onClick"],qe={class:"title-and-time"},Ge={class:"item-title"},De={class:"item-time"},We={class:"item-content"},Qe={class:"bullet-point"},Ue={class:"bullet-content"},Ve={key:5,class:"summary-section"};function He(e,t,a,n,o,s){return(0,l.uX)(),(0,l.CE)("div",Ce,[(0,l.Lk)("div",Le,[s.personalInfo.name?((0,l.uX)(),(0,l.CE)("h1",xe,(0,te.v_)(s.personalInfo.name),1)):(0,l.Q3)("",!0),s.personalInfo.email?((0,l.uX)(),(0,l.CE)("p",_e,(0,te.v_)(s.personalInfo.email)+" | "+(0,te.v_)(s.personalInfo.phone),1)):(0,l.Q3)("",!0),s.educationList&&s.educationList.length?((0,l.uX)(),(0,l.CE)("section",Ee,[t[0]||(t[0]=(0,l.Lk)("h2",{class:"session-title"},"教育经历",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.educationList,((e,t)=>((0,l.uX)(),(0,l.CE)("div",{class:(0,te.C4)(["education-item",{highlight:e.title===a.highlightTitle}]),key:t,onClick:t=>s.onTitleClick("education",e.title)},[(0,l.Lk)("div",Se,[(0,l.Lk)("h3",Te,(0,te.v_)(e.title),1),(0,l.Lk)("p",Ae,(0,te.v_)(e.content.from_time)+" - "+(0,te.v_)(e.content.to_time),1)]),(0,l.Lk)("ul",we,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.content.content,((e,t)=>((0,l.uX)(),(0,l.CE)("li",{class:"item-content-item",key:t},[(0,l.Lk)("span",je,(0,te.v_)(e.bullet_point)+":",1),(0,l.Lk)("span",Xe,(0,te.v_)(e.content),1)])))),128))])],10,Ie)))),128))])):(0,l.Q3)("",!0),s.workList&&s.workList.length?((0,l.uX)(),(0,l.CE)("section",Fe,[t[1]||(t[1]=(0,l.Lk)("h2",{class:"session-title"},"工作经历",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.workList,((e,t)=>((0,l.uX)(),(0,l.CE)("div",{class:(0,te.C4)(["work-item",{highlight:e.title===a.highlightTitle}]),key:t,onClick:t=>s.onTitleClick("workExperience",e.title)},[(0,l.Lk)("div",Oe,[(0,l.Lk)("h3",Ke,(0,te.v_)(e.title),1),(0,l.Lk)("p",Pe,(0,te.v_)(e.content.from_time)+" - "+(0,te.v_)(e.content.to_time),1)]),(0,l.Lk)("ul",Re,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.content.content,((e,t)=>((0,l.uX)(),(0,l.CE)("li",{class:"item-content-item",key:t},[(0,l.Lk)("span",Ne,(0,te.v_)(e.bullet_point)+":",1),(0,l.Lk)("span",Be,(0,te.v_)(e.content),1)])))),128))])],10,Me)))),128))])):(0,l.Q3)("",!0),s.projectList&&s.projectList.length?((0,l.uX)(),(0,l.CE)("section",Je,[t[2]||(t[2]=(0,l.Lk)("h2",{class:"session-title"},"项目经历",-1)),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.projectList,((e,t)=>((0,l.uX)(),(0,l.CE)("div",{class:(0,te.C4)(["project-item",{highlight:e.title===a.highlightTitle}]),key:t,onClick:t=>s.onTitleClick("projectExperience",e.title)},[(0,l.Lk)("div",qe,[(0,l.Lk)("h3",Ge,(0,te.v_)(e.title),1),(0,l.Lk)("p",De,(0,te.v_)(e.content.from_time)+" - "+(0,te.v_)(e.content.to_time),1)]),(0,l.Lk)("ul",We,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.content.content,((e,t)=>((0,l.uX)(),(0,l.CE)("li",{class:"item-content-item",key:t},[(0,l.Lk)("span",Qe,(0,te.v_)(e.bullet_point)+":",1),(0,l.Lk)("span",Ue,(0,te.v_)(e.content),1)])))),128))])],10,$e)))),128))])):(0,l.Q3)("",!0),s.personalSummary?((0,l.uX)(),(0,l.CE)("section",Ve,[t[3]||(t[3]=(0,l.Lk)("h2",{class:"session-title"},"个人总结",-1)),(0,l.Lk)("p",null,(0,te.v_)(s.personalSummary),1)])):(0,l.Q3)("",!0)])])}var Ye={name:"CVComponent",props:{highlightTitle:{type:String,default:""}},computed:{personalInfo(){return U.data.personalInfo},educationList(){return U.data.education},workList(){return U.data.workExperience},projectList(){return U.data.projectExperience},personalSummary(){return U.data.personalSummary}},methods:{onTitleClick(e,t){this.$emit("selected-module-changed",{type:e,title:t})}}};const ze=(0,r.A)(Ye,[["render",He],["__scopeId","data-v-34438fcf"]]);var Ze=ze;const et={class:"select-module"},tt=["onClick"];function at(e,t,a,n,o,s){return(0,l.uX)(),(0,l.CE)("div",et,[t[0]||(t[0]=(0,l.Lk)("h2",null,"请选择一个经历，开始与AI聊吧",-1)),(0,l.Lk)("ul",null,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(a.chatModules,(e=>((0,l.uX)(),(0,l.CE)("li",{key:e.title,onClick:t=>s.selectModule(e)},(0,te.v_)(e.title),9,tt)))),128))])])}var nt={name:"SelectModuleComponent",props:{chatModules:{type:Array,default:()=>[]}},methods:{selectModule(e){this.$emit("selected-module-changed",e)}}};const lt=(0,r.A)(nt,[["render",at],["__scopeId","data-v-0ff12d39"]]);var ot=lt,st={name:"CreateResume",components:{ChatComponent:ye,CVComponent:Ze,SelectModuleComponent:ot},data(){return{currentSelectedTitle:""}},computed:{chatModules(){const e=[],t=U.contentForType("education")||[];t.forEach(((t,a)=>{const n=t.title||`教育经历-${a+1}`;e.push({type:"education",title:n})}));const a=U.contentForType("workExperience")||[];a.forEach(((t,a)=>{const n=t.title||`工作经历-${a+1}`;e.push({type:"workExperience",title:n})}));const n=U.contentForType("projectExperience")||[];return n.forEach(((t,a)=>{const n=t.title||`项目经历-${a+1}`;e.push({type:"projectExperience",title:n})})),e}},methods:{handleUpdateResume(e){console.log("handleUpdateResume newMetaData",e),U.setContentForTitle(e.resumeData.title,e.resumeData)},handleSelectedModuleChanged(e){this.currentSelectedTitle=e.title},handleCloseChat(){this.currentSelectedTitle=""}}};const ct=(0,r.A)(st,[["render",ee],["__scopeId","data-v-0f12fad2"]]);var it=ct;const rt=[{path:"/",name:"Home",component:j},{path:"/resume-form",name:"ResumeForm",component:Y},{path:"/create-resume",name:"CreateResume",component:it}],dt=(0,p.aE)({history:(0,p.Bt)(),routes:rt});var ut=dt;const pt=(0,n.Ef)(u);pt.use(ut),pt.mount("#app")},2923:function(e,t,a){e.exports=a.p+"img/arrow-142.2588fa38.svg"},7494:function(e,t,a){e.exports=a.p+"img/chatgpt-send-icon.e7d64ab1.svg"},3700:function(e,t,a){e.exports=a.p+"img/create-7.64efec93.svg"},8158:function(e,t,a){e.exports=a.p+"img/form-7.030eec71.svg"},8677:function(e,t,a){e.exports=a.p+"img/im-chat-conversation-1.4bc7233d.svg"},5482:function(e,t,a){e.exports=a.p+"img/import-19.1948d925.svg"},5250:function(e,t,a){e.exports=a.p+"img/model-24.965e6c49.svg"},9444:function(e,t,a){e.exports=a.p+"img/logo1.f00483eb.png"}},t={};function a(n){var l=t[n];if(void 0!==l)return l.exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,a),o.exports}a.m=e,function(){var e=[];a.O=function(t,n,l,o){if(!n){var s=1/0;for(d=0;d<e.length;d++){n=e[d][0],l=e[d][1],o=e[d][2];for(var c=!0,i=0;i<n.length;i++)(!1&o||s>=o)&&Object.keys(a.O).every((function(e){return a.O[e](n[i])}))?n.splice(i--,1):(c=!1,o<s&&(s=o));if(c){e.splice(d--,1);var r=l();void 0!==r&&(t=r)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[n,l,o]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/ai-cv/"}(),function(){var e={524:0};a.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,o,s=n[0],c=n[1],i=n[2],r=0;if(s.some((function(t){return 0!==e[t]}))){for(l in c)a.o(c,l)&&(a.m[l]=c[l]);if(i)var d=i(a)}for(t&&t(n);r<s.length;r++)o=s[r],a.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return a.O(d)},n=self["webpackChunkai_cv"]=self["webpackChunkai_cv"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(2422)}));n=a.O(n)})();
//# sourceMappingURL=app.1087a792.js.map