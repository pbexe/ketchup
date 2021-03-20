import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const { username } = await req.body;

  const user = { isLoggedIn: true, username };
  req.session.set("user", user);
  await req.session.save();
  res.json(user);
});
