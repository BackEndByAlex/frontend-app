import { getFeedbackFromAuth } from '../feedback/getFeedbackController.js'

/**
 * Renders the home page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const renderHome = async (req, res) => {
  try {
    const feedbacks = await getFeedbackFromAuth()

    res.render('home/index', {
      title: 'Home',
      user: req.session.user,
      feedbacks // skicka med feedback till vyn
    })
  } catch (err) {
    res.render('home/index', {
      title: 'Home',
      user: req.session.user,
      feedbacks: []
    })
  }
}
