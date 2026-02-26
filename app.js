app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  
  if (!item) {
    return res.status(404).send('Item not found');
  }
  
  res.render('detail', { item: item });
});

app.post('/items/:id/status', (req, res) => {
  const item = items.find(i => i.id === req.params.id);
  
  if (item) {
    item.status = req.body.status;
  }
  
  res.redirect('/items/' + req.params.id);
});

app.post('/items/:id/delete', (req, res) => {
  const index = items.findIndex(i => i.id === req.params.id);
  
  if (index !== -1) {
    items.splice(index, 1);
  }
  
  res.redirect('/');
});