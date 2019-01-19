import User from '../models/user';
import Group from '../models/group';

export const createGroup = (req, res, next) => {
  const {title, description} = req.body.group;

  const group = Group({ title, description, creator: req.user._id });

  group.save((error) => {
    if (error) { return next(error); }

    res.json(group);
  })
}

export const getGroup = (req, res, next) => {
  const groupId = req.params.id;

  Group.findById(groupId).populate('creator').exec((err, group) => { 

    if (err) return res.status(500).send(err);
    res.json(group);
  });
}

export const updateGroup = (req, res, next) => {
  const groupId = req.params.id;

  Group.findByIdAndUpdate(
      groupId,
      req.body.group,
      {new: true},
      (err, group) => {
        if (err) return res.status(500).send(err);
        return res.send(group);
      }
  )
}

export const getGroups = (req, res, next) => {
  Group.find({}, (err, groups) => {
    if (err) return res.status(500).send(err);
    return res.send(groups);
  })
}