import { useToast } from 'vue-toastification'
import apiClient from '@/api/axios'
import { PDFDocument } from 'pdf-lib'

const toast = useToast()
async function downloadPngUrlAspdf(pngUrl, fileName = "简历") {
    // 把图片取回来
    const pngBytes = await fetch(pngUrl).then(res => res.arrayBuffer())
    // 创建 PDF 文档
    const pdfDoc = await PDFDocument.create()
    const pngImage = await pdfDoc.embedPng(pngBytes)
    const { width, height } = pngImage.scale(0.6)
    const page = pdfDoc.addPage([width, height])
    page.drawImage(pngImage, { x: 0, y: 0, width, height })
    const pdfBytes = await pdfDoc.save()
    // 下载 PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fileName}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
async function downloadResume(resume) {
    toast.success('简历下载中')
    const response = await apiClient.post('/pic/scf-screenshot', {
        resumeId: resume.resumeId,
        templateType: resume.templateType,
        color: resume.color,
    })

    const urls = response.data.data.screenshotUrls
    if (response.data.code === 20009 && Array.isArray(urls) && urls.length) {
        if (urls.length === 1) {
            await downloadPngUrlAspdf(urls[0])
        } else {
            await downloadImagesAsPdf(urls, resume.name || '简历')
        }
    } else if (response.data.data.screenshotUrl) {
        // 向后兼容旧接口
        await downloadPngUrlAspdf(response.data.data.screenshotUrl)
    } else {
        toast.error('下载失败，请重试')
    }
   
}
  
async function downloadImagesAsPdf(urls, fileName = "简历") {
    // 创建一个 PDF 文档
    const pdfDoc = await PDFDocument.create()

    for (let url of urls) {
        // 下载图片数据
        const imgBytes = await fetch(url).then(res => res.arrayBuffer())

        // 判断图片类型（这里只写 PNG / JPG）
        let img
        if (url.toLowerCase().endsWith('.png')) {
            img = await pdfDoc.embedPng(imgBytes)
        } else {
            img = await pdfDoc.embedJpg(imgBytes)
        }

        const { width, height } = img.scale(1)
        // 每张图一页
        const page = pdfDoc.addPage([width, height])
        page.drawImage(img, { x: 0, y: 0, width, height })
    }

    // 导出 PDF
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const pdfUrl = URL.createObjectURL(blob)

    // 触发下载
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = `${fileName}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(pdfUrl)
}
export { downloadResume }