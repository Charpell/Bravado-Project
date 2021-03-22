import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont()
const myIcon = <Icon name="search" size={12} color="#B3B3B3" />;
import Highlighter from 'react-native-highlight-words';
import Loading from './components/Loading'


export default function index() {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
        fetch('https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json')
            .then((data) => data.json())
            .then((data) => {
              setUsers(data)
              setLoading(false)
            })
    }, [])

    const newSearch = () => {
      let filtered = users.filter((user, index) => user.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || user.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 || user.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 || user.address.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      return filtered
  }

    const renderList = ({ item }) => {
        return (
          <MainContainer>
            <TextContainer>
            <Highlighter
              highlightStyle={{backgroundColor: 'yellow'}}
              searchWords={[search]}
              textToHighlight={item.name}
              style={{ fontWeight: "600", fontSize: 18, lineHeight: 30, color: "#000000" }}
            />
            <Highlighter
              highlightStyle={{backgroundColor: 'yellow'}}
              searchWords={[search]}
              textToHighlight={item.email}
              style={{ fontSize: 13, lineHeight: 20 }}
            />
            <Highlighter
              highlightStyle={{backgroundColor: 'yellow'}}
              searchWords={[search]}
              textToHighlight={item.title}
              style={{ fontSize: 13, lineHeight: 20 }}
            />
            <Highlighter
              highlightStyle={{backgroundColor: 'yellow'}}
              searchWords={[search]}
              textToHighlight={item.address}
              style={{ fontSize: 13, lineHeight: 20 }}
            />
            </TextContainer>
            <ImageContainer><Image source={{ uri: item.avatar }} /></ImageContainer>
          </MainContainer>
        )
    }

    if (loading) return <Loading />

    return (
        <Container>
            <SearchContainer>
                <IconContainer>
                  {myIcon}
                </IconContainer>
                <SearchInput placeholder={"Search"} placeholderTextColor={"#D7D7D7"} onChangeText={(text) => setSearch(text)} value={search} />
            </SearchContainer>
              <List 
                data={newSearch()}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderList}
            />
        </Container>
    )
}

const Container = styled.View`
    background-color: #B9B9B9;
    flex: 1;
`
const SearchContainer = styled.View`
    flex-direction: row;
    margin: 0px 20px 20px;
    background-color: #fff;
    border-radius: 4px;
    margin-top: 15%;
`
const SearchInput = styled.TextInput`
    flex: 1;
    height: 32px;
    font-size: 10px
    font-weight: 400;
    font-size: 14.03px;
    line-height: 16.98px;
    color: #000000;
    opacity: 7.5;
`
const IconContainer = styled.View`
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
`
const List = styled.FlatList`

`

const MainContainer = styled.View`
    background-color: #ffffff;
    border-radius: 8px;
    padding: 10px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 0px 20px 15px;
`
const ImageContainer = styled.View`
  background-color: #B9B9B9;
  border-radius: 4px;
`
const Image = styled.Image`
  width: 68px;
  height: 68px;
`
const TextContainer = styled.View`
`