/** @format */

import './styles.css'
import { Component } from 'react'

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'
import { TextInput } from '../../components/TextInput'

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state
    const postsAndPhotos = await loadPosts()

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    })
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, postsPerPage, page, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    // operação ternária
    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase())
        })
      : posts

    return (
      <section className="container">
        {/* 
          curto-circuito 

          !!searchValue transforma o return para boolean, no caso, se 
          for uma string vazia, return False.
        */}
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Search Value: {searchValue} </h1>
            </>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Não existem posts =(</p>}

        <div className="button-container">
          {/* simples negação de searchValue */}
          {!searchValue && (
            <Button
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    )
  }
}
export default Home
