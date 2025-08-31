# GmoqAI Website - Image Setup Instructions

## 📸 Where to Add Your Images

Place all images in the `public` folder of your project:

```
gmoqai-website/
├── public/
│   ├── logo.png (or logo.svg)           # Your company logo
│   ├── ceo-photo.jpg                    # CEO profile photo  
│   ├── team/                            # Team member photos
│   │   ├── jane-smith.jpg
│   │   ├── mike-johnson.jpg
│   │   └── sarah-williams.jpg
│   ├── projects/                        # Project screenshots (optional)
│   │   ├── fraud-detection.jpg
│   │   ├── ecommerce.jpg
│   │   └── dashboard.jpg
│   └── testimonials/                    # Client photos (optional)
│       ├── alex-chen.jpg
│       └── maria-rodriguez.jpg
```

## 🖼️ Image Requirements

### Logo (`public/logo.png`)
- **Size**: 200x200px recommended
- **Format**: PNG with transparent background (or SVG)
- **Usage**: Navigation bar and footer
- **Colors**: Should work on both light and dark backgrounds

### CEO Photo (`public/ceo-photo.jpg`)
- **Size**: 500x500px recommended  
- **Format**: JPG or PNG
- **Style**: Professional headshot
- **Usage**: About section spotlight

### Team Photos (`public/team/*.jpg`)
- **Size**: 300x300px recommended
- **Format**: JPG or PNG
- **Style**: Professional headshots
- **Usage**: About section team grid

## 🔄 How to Activate Images

Once you add the images, uncomment these lines in the code:

### 1. Navigation Logo (`src/components/layout/Navigation.tsx`)
```typescript
// Replace this line:
<Code2 />

// With this:
<Image src="/logo.png" alt="GmoqAI Logo" width={24} height={24} />
```

### 2. Footer Logo (`src/components/layout/FooterSimple.tsx`)  
```typescript
// Replace this line:
<Code2 />

// With this:
<Image src="/logo.png" alt="GmoqAI Logo" width={24} height={24} />
```

### 3. CEO Photo (`src/components/sections/AboutSection.tsx`)
```typescript
// Find this section and uncomment:
{/* <Image 
  src={ceo.photo} 
  alt={ceo.name}
  fill
  className="object-cover"
/> */}
```

### 4. Team Photos (`src/components/sections/AboutSection.tsx`)
```typescript
// Find this section and uncomment:
{/* <Image 
  src={member.photo} 
  alt={member.name}
  fill
  className="object-cover"
/> */}
```

## ✨ Image Optimization Tips

1. **Compress images** before uploading (use tools like TinyPNG)
2. **Use consistent aspect ratios** for team photos
3. **Optimize for web** - keep file sizes under 500KB
4. **Test on both themes** - ensure images look good in dark/light mode

## 🎨 Current Placeholders

The website currently uses:
- **Logo**: Code icon with gradient background
- **Photos**: Initials in colored circles
- **Projects**: Gradient backgrounds with project info

All placeholders will be automatically replaced when you add your images!

## 🚀 Quick Start

1. Add your `logo.png` to the `public` folder
2. Add your `ceo-photo.jpg` to the `public` folder  
3. Uncomment the Image components in the code files
4. Refresh your browser - images will appear!

The website is fully functional with or without custom images. Add them whenever you're ready! 📷