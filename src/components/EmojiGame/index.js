import {Component} from 'react'
import './index.css'

import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'

class EmojiGame extends Component {
  state = {score: 0, initialId: [], topScore: 0, gameOver: false}

  shuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  clickEmoji = id => {
    const {score, initialId, topScore, gameOver} = this.state
    if (!gameOver) {
      if (!initialId.includes(id)) {
        this.setState(prevState => ({
          score: prevState.score + 1,
          initialId: [...prevState.initialId, id],
        }))
      } else if (topScore <= score) {
        this.setState({topScore: score, score: 0, initialId: []})
        this.shuffledEmojisList()
      }
    }
  }

  render() {
    const {emojisList} = this.props
    const {score, topScore} = this.state

    return (
      <div className="bg-con">
        <NavBar score={score} topScore={topScore} />
        <ul className="emojisCon">
          {emojisList.map(eachList => (
            <EmojiCard
              key={eachList.id}
              emojisFace={eachList}
              clickEmoji={this.clickEmoji}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default EmojiGame
