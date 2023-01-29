/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'
import './index.css'

class EmojiGame extends Component {
  state = {isGameOver: false, topScore: 0, myEmojiList: []}

  shuffeledEmoji = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  getShuffeledEmoji = () => {
    const NewEmojiList = this.shuffeledEmoji()

    return (
      <ul className="emoji-list-container">
        {NewEmojiList.map(each => (
          <EmojiCard
            key={each.id}
            emojiDetails={each}
            onClickEmoji={this.onClickEmoji}
          />
        ))}
      </ul>
    )
  }

  getScore = () => {
    const {emojisList} = this.props
    const {myEmojiList} = this.state
    const isWon = myEmojiList.length === emojisList.length
    console.log(`Score is ${myEmojiList.length}`)

    return (
      <WinOrLoseCard
        isWon={isWon}
        score={myEmojiList.length}
        onResetGame={this.resetGame}
      />
    )
  }

  updateScore = () => {
    const {emojisList} = this.props
    const {myEmojiList} = this.state
    const score = myEmojiList.length
    if (score === emojisList.length) {
      this.gameOver(score)
    }
  }

  onClickEmoji = id => {
    const {myEmojiList} = this.state
    const isEmojiClickedBefore = myEmojiList.includes(id)
    const score = myEmojiList.length

    if (isEmojiClickedBefore) {
      this.gameOver(score)
    } else {
      this.setState(
        prevState => ({
          myEmojiList: [...prevState.myEmojiList, id],
        }),
        this.updateScore,
      )
    }
  }

  gameOver = score => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (score > newTopScore) {
      newTopScore = score
    }
    this.setState({topScore: newTopScore, isGameOver: true})
    console.log(`TopScore is ${newTopScore}`)
  }

  resetGame = () => {
    this.setState({myEmojiList: [], isGameOver: false})
  }

  render() {
    const {isGameOver, topScore, myEmojiList} = this.state

    return (
      <div className="app-container">
        <NavBar
          topScore={topScore}
          score={myEmojiList.length}
          isGameOver={isGameOver}
        />
        <div className="card-container">
          {isGameOver ? this.getScore() : this.getShuffeledEmoji()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
