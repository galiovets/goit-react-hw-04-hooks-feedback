import React, { useState } from 'react';
import Section from './components/Section';
import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import NotifMessage from './components/Notification message';
import './App.css';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = evt => {
    const { name } = evt.target;
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / countTotalFeedback()) * 100);
  };

  return (
    <Section title="Please leave your feedback">
      <FeedbackOptions onLeaveFeedback={onLeaveFeedback} options="Good" name="good" />
      <FeedbackOptions onLeaveFeedback={onLeaveFeedback} options="Neutral" name="neutral" />
      <FeedbackOptions onLeaveFeedback={onLeaveFeedback} options="Bad" name="bad" />
      {countTotalFeedback() === 0 ? (
        <NotifMessage message="There is no feedback yet" />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      )}
    </Section>
  );
}
