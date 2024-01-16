/** @format */

import './styles.css'
import { Component } from 'react'

import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts'
import { Button } from '../../components/Button'

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
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
    console.log('Load More Posts Chamado')
  }

  render() {
    const { posts } = this.state

    return (
      <section className="container">
        <Posts posts={posts} />
        <Button text="Load More Posts" onClick={this.loadMorePosts} />
      </section>
    )
  }
}
export default Home
