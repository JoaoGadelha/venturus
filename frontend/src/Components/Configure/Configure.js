import React, { useState, useEffect, useRef } from 'react'
import styles from './Configure.module.css'
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { Context } from '../../Context'
import { postData } from '../../commonFunctions'
import ResultItem from './ResultItem/ResultItem'
import Tag from './Tag/Tag'


// page that opens when the user clicks on the create or edit team.
const Configure = (props) => {

    // these variables are explained in the Context.js file
    let { createTeam, clientData, setClientData, teamID } = useContext(Context);
    // refs to elements in this component
    let refTeamName = useRef();
    let refTeamType = useRef();
    let refTeamWebsite = useRef();
    let refDescription = useRef();
    let refOuterRadio1 = useRef();
    let refInnerRadio1 = useRef();
    let refOuterRadio2 = useRef();
    let refInnerRadio2 = useRef();
    let refRadioTag1 = useRef();
    let refRadioTag2 = useRef();
    let refInputTags = useRef();
    let refTags = useRef();
    let refFormation = useRef();
    let refMessage = useRef();
    let refTeamNameLabel = useRef();
    let refTeamWebsiteLabel = useRef();
    let refSearchResultWindow = useRef();
    // used to navigate to another route in the frontend site.
    // in this application, its mainly used to navigate between
    // the main page and the teams configuration page.
    const history = useHistory();
    // stores the result of the players name search.
    let [resultArray, setResultArray] = useState([]);
    // stores the index of the currently clicked team in the MyTeam board.
    let [teamIndex, setTeamIndex] = useState('');
    // flag that signals if the radio button Real is selected or not
    let [realTypeIsSelected, setRealTypeIsSelected] = useState(true);
    // stores all the tags in the tags field in the configuration page
    let [tags, setTags] = useState([]);

    useEffect(() => {
        // scrolls to the top of the page when the page is opened.
        window.scrollTo(0, 0);

        // if the client is updating and not creating a new team
        if (!createTeam) {

            let index = -1;
            for (let i = 0; i < clientData[0].teams.length; i++) {
                if (clientData[0].teams[i].teamID === teamID) {
                    index = i;
                }
            }

            refTeamName.current.value = clientData[0].teams[index].teamName;
            refDescription.current.value = clientData[0].teams[index].description;
            refTeamWebsite.current.value = clientData[0].teams[index].website;

            if (clientData[0].teams[index].type === 'real') {
                setRadio(1);
            } else {
                setRadio(2);
            }

            let tagsArray = [];
            for (let i = 0; i < clientData[0].teams[index].tags.length; i++) {
                tagsArray.push(clientData[0].teams[index].tags[i]);
            }
            setTags(tagsArray);
        } else {
            console.log(refSearchResultWindow.current);
            refSearchResultWindow.current.style.height = '100px';
        }
    }, [])

    // this code snippet runs whenever teamID changes its value.
    // used to update the index of the currently clicked team
    // in the main page
    useEffect(() => {
        let index = -1;
        for (let i = 0; i < clientData[0].teams.length; i++) {
            if (clientData[0].teams[i].teamID === teamID) {
                index = i;
            }
        }
        setTeamIndex(index);
    }, [teamID])

    // updates the type tag radio button.
    // switches between the real and fantasy radio buttons.
    const setRadio = (radioNumber) => {
        if (radioNumber === 1) {
            refOuterRadio1.current.style.border = 'solid rgba(0, 0, 0, 0.315) 1px';
            refOuterRadio2.current.style.border = 'solid rgba(0, 0, 0, 0.527) 1px';
            refInnerRadio1.current.style.background = 'linear-gradient(to right, #8a1f6e, #c00e4e)';
            refInnerRadio2.current.style.background = 'white';
            refRadioTag1.current.style.color = ' #c50341';
            refRadioTag2.current.style.color = 'rgba(0, 0, 0, 0.3)';
            setRealTypeIsSelected(true);
        } else {
            refOuterRadio1.current.style.border = 'solid rgba(0, 0, 0, 0.527) 1px';
            refOuterRadio2.current.style.border = 'solid rgba(0, 0, 0, 0.315) 1px';
            refInnerRadio1.current.style.background = 'white';
            refInnerRadio2.current.style.background = 'linear-gradient(to right, #8a1f6e, #c00e4e)';
            refRadioTag1.current.style.color = 'rgba(0, 0, 0, 0.3)';
            refRadioTag2.current.style.color = '#c50341';
            setRealTypeIsSelected(false);
        }
    }

    // used to focus on the input field in the tags section in the configuration
    // page whenever the user clicks on the container surrounding the input field.
    const focusOnTagsInput = () => {
        refInputTags.current.focus();
    }

    // this snippet runs whenever the user types something on the
    // tags input field and presses either 'enter' or 'semicolons' keys.
    // updates the state that stores the tags.
    const submitTag = (e) => {
        if (e.charCode === 13 || e.charCode === 59) {
            let auxTags = [...tags];
            auxTags.push({ value: e.target.value, id: '_' + Math.random().toString(36).substr(2, 9) });
            setTags(auxTags);
            refInputTags.current.value = '';
        }
    }

    // function callback used to close the tags
    // whenever the user clicks the 'close'
    // button
    const closeTag = (id) => {
        let auxTags = [...tags];
        for (let i = 0; i < auxTags.length; i++) {
            if (auxTags[i].id === id) {
                auxTags.splice(i, 1);
            }
        }
        setTags(auxTags);
    }

    // performs the search of players by name in the configuration page.
    const nameSearch = (name) => {
        // if the user is updating an already existing team,
        // and not creating a new one, then the search can be
        // made. 
        if (!createTeam) {
            let auxArray = [];
            for (let i = 0; i < clientData[0].teams[teamIndex].team.length; i++) {
                if (name !== '' && clientData[0].teams[teamIndex].team[i].name.toLowerCase().includes(name.toLowerCase())) {
                    auxArray.push(i);
                }
            }
            setResultArray(auxArray);
        }
    }

    // this snippet runs whenever the user tries to save a team.
    // verifies if the inputs the user inserted in the interface
    // are valid or not.
    const validateForm = () => {
        refMessage.current.style.color = 'white';
        refMessage.current.innerHTML = 'Please fill in all the highlighted fields above.'
        refTeamNameLabel.current.style.color = 'black';
        refTeamName.current.style.border = 'solid rgba(0, 0, 0, 0.2) 1px';
        refTeamWebsite.current.style.border = 'solid rgba(0, 0, 0, 0.2) 1px';
        refTeamWebsiteLabel.current.style.color = 'black';
        let response = true;
        if (refTeamName.current.value.length === 0) {
            refMessage.current.style.color = 'red';
            refTeamName.current.style.border = 'solid #c50341 1px';
            refTeamNameLabel.current.style.color = '#c50341';
            response = false;
        }
        if (!validURL(refTeamWebsite.current.value)) {
            refMessage.current.innerHTML = 'Invalid website URL.'
            refMessage.current.style.color = 'red';
            refTeamWebsite.current.style.border = 'solid #c50341 1px';
            refTeamWebsiteLabel.current.style.color = '#c50341';
            response = false;
        }
        if (refTeamWebsite.current.value.length === 0) {
            refMessage.current.style.color = 'red';
            refMessage.current.innerHTML = 'Please fill in all the highlighted fields above.'
            refTeamWebsite.current.style.border = 'solid #c50341 1px';
            refTeamWebsiteLabel.current.style.color = '#c50341';
            response = false;
        }

        return response;

    }

    function validURL(str) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(str)
    }

    // sends all the info the user inserted in the interface 
    // to the backend to be stored in MongoDB Atlas.
    const clickSaveBtn = async () => {
        let readyToSend = validateForm();
        let selectedType;
        if (realTypeIsSelected) {
            selectedType = 'real';
        } else {
            selectedType = 'fantasy';
        }
        if (readyToSend) {
            let corsAnywhere = '';
            let destiny;
            let data = {
                id: clientData[0]._id,
                teamID: teamID,
                description: refDescription.current.value,
                teamName: refTeamName.current.value,
                website: refTeamWebsite.current.value,
                type: selectedType,
                tags: tags,
                formation: refFormation.current.value
            }
            if (createTeam) {
                destiny = 'createTeam'
            } else {
                destiny = 'updateTeam'
            }
            let url = corsAnywhere + 'https://venturus.herokuapp.com/' + destiny;
            let answer = await postData(url, data);
            setClientData(answer);
           // navigates to the '/' route, a.k.a. the main page
            history.push("/");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <h1 className={styles.title}>Create your team</h1>
                <div className={styles.divider}></div>
                <p className={styles.p}>TEAM INFORMATION</p>
                <div className={styles.grid1}>
                    <div className={styles.inputWrapper}>
                        <h1 className={styles.h1} ref={refTeamNameLabel}>Team name</h1>
                        <input ref={refTeamName} className={styles.input}></input>
                    </div>
                    <div className={styles.inputWrapper}>
                        <h1 className={styles.h1} ref={refTeamWebsiteLabel}>Team website</h1>
                        <input ref={refTeamWebsite} className={styles.input}></input>
                    </div>
                    <div className={styles.inputWrapper}>
                        <h1 className={styles.h1}>Description</h1>
                        <textarea ref={refDescription} className={styles.descriptionInput}></textarea>
                    </div>
                    <div className={styles.inputWrapper}>
                        <h1 className={styles.h1}>Team type</h1>
                        <div className={styles.radioContainer}>
                            <div className={styles.radioButtonWrapper}>
                                <div className={styles.radioButton1OuterCircle} onClick={() => setRadio(1)} ref={refOuterRadio1}>
                                    <div className={styles.radioButton1InnerCircle} ref={refInnerRadio1}></div>
                                </div>
                                <p className={styles.tagRadioButton1} ref={refRadioTag1}>Real</p>
                            </div>
                            <div className={styles.radioButtonWrapper}>
                                <div className={styles.radioButton2OuterCircle} onClick={() => setRadio(2)} ref={refOuterRadio2}>
                                    <div className={styles.radioButton2InnerCircle} ref={refInnerRadio2}></div>
                                </div>
                                <p className={styles.tagRadioButton2} ref={refRadioTag2}>Fantasy</p>
                            </div>
                        </div>
                        <h1 className={styles.h1}>Tags</h1>
                        <div ref={refTags} className={styles.tagsInputBox} onClick={focusOnTagsInput}>
                            {tags.map((item) => <Tag data={item} close={closeTag} />)}
                            <input onKeyPress={e => submitTag(e)} className={styles.tagsInput} ref={refInputTags}></input>
                        </div>
                    </div>
                </div>
                <p className={styles.p}>CONFIGURE SQUAD</p>
                <div className={styles.grid2}>
                    <div className={styles.formation}>
                        <div className={styles.fieldTitleContainer}>
                            <h1 className={styles.h1}>Formation</h1>
                            <select name="cars" id="cars" ref={refFormation} className={styles.formationSelect}>
                                <option value="343">3 - 4 - 3</option>
                                <option value="3223">3 - 2 - 2 - 3</option>
                                <option value="3231">3 - 2 - 3 - 1</option>
                                <option value="352">3 - 5 - 2</option>
                                <option value="4231">4 - 2 - 3 - 1</option>
                                <option value="4311">4 - 3 - 1 - 1</option>
                                <option value="432">4 - 3 - 2</option>
                                <option value="442">4 - 4 - 2</option>
                                <option value="451">4 - 5 - 1</option>
                                <option value="541">5 - 4 - 1</option>
                            </select>
                            <div className={styles.selectVerticalLine}></div>
                            <div className={styles.selectBorder}></div>
                        </div>
                        <div className={styles.field}>
                            <div className={styles.fieldLine}></div>
                            <div className={styles.fieldCircle}></div>
                        </div>
                        <button onClick={clickSaveBtn} className={styles.saveBtn}>Save</button>
                    </div>
                    <div className={styles.search}>
                        <h1 className={styles.searchTitle}>Search Players</h1>
                        <input onChange={(e) => nameSearch(e.target.value)} className={styles.inputSearch}></input>
                        <div className={styles.resultWindow} ref={refSearchResultWindow}>
                            {createTeam ? <p className={styles.searchMessage}>The search feature is only available when configuring an already existing team.</p> :
                                resultArray.map((item, i) => <ResultItem index={item} data={clientData} teamIndex={teamIndex} />)
                            }
                        </div>
                    </div>
                    <button onClick={clickSaveBtn} className={styles.saveBtnMobile}>Save</button>
                    <h2 className={styles.h2} ref={refMessage}>Please fill in all the highlighted fields above.</h2>
                </div>
            </div>
        </div>
    )
}

export default Configure