// import React from 'react';
import { STORAGE_KEY } from './variables';

export const changeTheme = (newTheme) => {
    document.documentElement.setAttribute('theme', newTheme);
    document.querySelectorAll('.mobile-address-bar-color').forEach( element => element.setAttribute('content', getComputedStyle(document.body).backgroundColor) );
    document.querySelectorAll('.shortcut-icon').forEach( element => element.setAttribute('href', `/images/icon-${newTheme}-192.png`) );
    
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    data.userPreferences.theme = newTheme;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const getData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Notice! an error occurred while getting the data from ${url}.\n`, error);
        return null;
    }
}

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
    return sortedData;
}

