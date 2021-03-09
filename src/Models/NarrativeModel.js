export class NarrativeModel {
  id;
  type;
  text;
  image;
  video;
  link_to_scene;
  background_colour;
  is_end;

  constructor(id, type, text = null, image = null, video = null, link_to_scene = null, is_end = false, background_colour = 'black') {
    this.id = id;
    this.type = type;
    this.text = text;
    this.image = image;
    this.video = video;
    this.link_to_scene = link_to_scene;
    this.background_colour = background_colour;
    this.is_end = is_end;
  }
}
