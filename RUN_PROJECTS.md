# How to Run Your Projects

Both the portfolio and blog applications are ready to run! Since they both use port 3000 by default, you'll need to run them in separate terminals or configure different ports.

## Option 1: Run in Separate Terminals (Recommended)

### Terminal 1 - Portfolio
```bash
cd portfolio
npm run dev
```
Portfolio will be available at: **http://localhost:3000**

### Terminal 2 - Blog
```bash
cd blog
npm run dev -- -p 3001
```
Blog will be available at: **http://localhost:3001**

## Option 2: Run One at a Time

### Run Portfolio Only
```bash
cd portfolio
npm run dev
```
Visit: **http://localhost:3000**

### Run Blog Only
```bash
cd blog
npm run dev
```
Visit: **http://localhost:3000**

## Quick Start Commands

### Portfolio
```bash
# Development
cd portfolio
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

### Blog
```bash
# Development
cd blog
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

## What to Test

### Portfolio (http://localhost:3000)
- ✅ Hero section with gradient animation
- ✅ Skills section with animated bars
- ✅ Projects section with flip cards
- ✅ Experience/Education timeline
- ✅ Achievements and certifications
- ✅ Smooth scroll animations
- ✅ Responsive design on mobile

### Blog (http://localhost:3001)
- ✅ Theme toggle (light/dark mode)
- ✅ Theme persistence across pages
- ✅ Post cards with animations
- ✅ Navigation bar with sticky positioning
- ✅ Responsive mobile menu
- ✅ Post detail pages
- ✅ Smooth transitions

## Troubleshooting

### Port Already in Use
If you see "Port 3000 is already in use":
- Use a different port: `npm run dev -- -p 3001`
- Or stop the other process using port 3000

### Build Errors
If you encounter build errors:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Hot Reload Not Working
- Save the file again
- Restart the dev server
- Check for syntax errors in the console

## Production Build

Before deploying, test the production build:

```bash
# Portfolio
cd portfolio
npm run build
npm start

# Blog
cd blog
npm run build
npm start
```

## Next Steps

1. **Test locally** - Run both applications and test all features
2. **Follow testing guides** - Use `TESTING_CHECKLIST.md` and `INTEGRATION_GUIDE.md`
3. **Build for production** - Run `npm run build` in both directories
4. **Deploy** - Deploy to Vercel or your preferred hosting platform

---

**Happy coding!** 🚀
