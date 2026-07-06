#!/usr/bin/env python3
"""
Veloform 项目全面测试脚本
路径: veloform_test.py v1.0.0
功能：使用 Playwright 对 Veloform 项目进行系统化测试，包括功能、响应式、无障碍等方面
"""

import os
import sys
import time
import json
from datetime import datetime
from playwright.sync_api import sync_playwright, Page, Browser, Error as PlaywrightError

# 输出目录
OUTPUT_DIR = "/workspace/dogfood-output"
SCREENSHOTS_DIR = os.path.join(OUTPUT_DIR, "screenshots")
VIDEOS_DIR = os.path.join(OUTPUT_DIR, "videos")

# 创建目录
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
os.makedirs(VIDEOS_DIR, exist_ok=True)

# 问题报告数据
issues = []
issue_counter = 0

def record_issue(page: Page, title: str, severity: str, description: str, 
                 repro_steps: list, screenshot_name: str = None):
    """记录测试发现的问题"""
    global issue_counter
    issue_counter += 1
    issue_id = f"ISSUE-{issue_counter:03d}"
    
    # 截图
    screenshot_path = None
    if screenshot_name:
        screenshot_path = os.path.join(SCREENSHOTS_DIR, f"{issue_id}-{screenshot_name}.png")
        page.screenshot(path=screenshot_path, full_page=True)
    
    # 控制台日志
    console_logs = []
    try:
        # 尝试获取控制台消息（需要在运行时捕获）
        pass
    except:
        pass
    
    issue_data = {
        "id": issue_id,
        "title": title,
        "severity": severity,
        "description": description,
        "repro_steps": repro_steps,
        "screenshot": screenshot_path,
        "timestamp": datetime.now().isoformat(),
        "url": page.url
    }
    
    issues.append(issue_data)
    print(f"\n⚠️  发现问题 [{issue_id}]: {title}")
    print(f"   严重性: {severity}")
    print(f"   描述: {description}")
    if screenshot_path:
        print(f"   截图: {screenshot_path}")
    
    return issue_id

def safe_action(page: Page, action_name: str, action_func: callable, *args, **kwargs):
    """安全执行操作，捕获错误"""
    try:
        result = action_func(*args, **kwargs)
        return True, result
    except PlaywrightError as e:
        error_msg = str(e)
        print(f"❌ 操作失败: {action_name} - {error_msg}")
        record_issue(
            page,
            f"{action_name} 失败",
            "medium",
            f"执行操作时发生错误: {error_msg}",
            [f"尝试执行 {action_name}"],
            f"{action_name}-error"
        )
        return False, None
    except Exception as e:
        error_msg = str(e)
        print(f"❌ 操作失败: {action_name} - {error_msg}")
        record_issue(
            page,
            f"{action_name} 异常",
            "medium",
            f"执行操作时发生异常: {error_msg}",
            [f"尝试执行 {action_name}"],
            f"{action_name}-exception"
        )
        return False, None

def take_screenshot(page: Page, name: str):
    """拍摄截图"""
    path = os.path.join(SCREENSHOTS_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=True)
    print(f"📸 截图保存: {path}")
    return path

def test_homepage(page: Page):
    """测试首页（/）"""
    print("\n" + "="*60)
    print("测试首页（/）")
    print("="*60)
    
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    take_screenshot(page, "homepage-initial")
    
    # 测试 Hero section
    print("\n📍 测试 Hero section...")
    hero_title = page.locator('h1').first
    if hero_title.count() > 0:
        text = hero_title.text_content()
        print(f"   Hero 标题: {text}")
        if not text or len(text) < 5:
            record_issue(page, "Hero 标题内容异常", "low", 
                        "Hero section 标题文本缺失或过短", 
                        ["1. 打开首页", "2. 检查 h1 标题元素"], 
                        "hero-title")
    else:
        record_issue(page, "Hero section 缺失", "high", 
                    "首页未找到 Hero section 的 h1 标题", 
                    ["1. 打开首页", "2. 查找 h1 元素"], 
                    "hero-missing")
    
    # 测试 Features 卡片
    print("\n📍 测试 Features 卡片...")
    feature_cards = page.locator('[class*="feature"], [class*="card"]').all()
    print(f"   找到 {len(feature_cards)} 个卡片元素")
    
    if len(feature_cards) < 3:
        record_issue(page, "Features 卡片数量不足", "medium", 
                    f"Features section 仅包含 {len(feature_cards)} 个卡片，预期至少 3 个", 
                    ["1. 打开首页", "2. 检查 Features 卡片数量"], 
                    "features-cards")
    
    # 测试卡片交互
    for i, card in enumerate(feature_cards[:3]):  # 测试前3个卡片
        success, _ = safe_action(page, f"点击 Features 卡片 {i+1}", 
                                 card.click, timeout=3000)
        if success:
            page.wait_for_timeout(500)
            take_screenshot(page, f"feature-card-{i+1}-clicked")
    
    # 测试 BikeTypeSelector
    print("\n📍 测试 BikeTypeSelector...")
    bike_selectors = page.locator('[class*="bike"], [class*="type"]').all()
    print(f"   找到 {len(bike_selectors)} 个相关元素")
    
    # 尝试查找选择按钮或下拉框
    select_buttons = page.locator('button, [role="button"]').all()
    for btn in select_buttons:
        text = btn.text_content()
        if text and any(keyword in text.lower() for keyword in ['bike', '山地', '公路', '选择']):
            print(f"   找到自行车相关按钮: {text}")
            success, _ = safe_action(page, "点击自行车类型选择器", btn.click)
            if success:
                page.wait_for_timeout(1000)
                take_screenshot(page, "bike-selector-clicked")
    
    # 测试 Pricing 切换
    print("\n📍 测试 Pricing 切换...")
    pricing_section = page.locator('[class*="pricing"]').first
    if pricing_section.count() > 0:
        print("   找到 Pricing section")
        
        # 寻找月/年切换按钮
        toggle_buttons = page.locator('[class*="toggle"], [class*="switch"]').all()
        print(f"   找到 {len(toggle_buttons)} 个切换按钮")
        
        for i, toggle in enumerate(toggle_buttons[:2]):
            success, _ = safe_action(page, f"点击 Pricing 切换按钮 {i+1}", toggle.click)
            if success:
                page.wait_for_timeout(500)
                take_screenshot(page, f"pricing-toggle-{i+1}")
    else:
        record_issue(page, "Pricing section 缺失", "medium", 
                    "首页未找到 Pricing section", 
                    ["1. 打开首页", "2. 查找 Pricing section"], 
                    "pricing-missing")
    
    # 测试 CTA 按钮
    print("\n📍 测试 CTA 按钮...")
    cta_buttons = page.locator('button:has-text("开始"), button:has-text("Start"), button:has-text("立即"), a:has-text("开始")').all()
    print(f"   找到 {len(cta_buttons)} 个 CTA 按钮")
    
    for i, cta in enumerate(cta_buttons[:2]):
        text = cta.text_content()
        print(f"   CTA 按钮 {i+1}: {text}")
        success, _ = safe_action(page, f"点击 CTA 按钮 {i+1}", cta.click)
        if success:
            page.wait_for_load_state('networkidle')
            take_screenshot(page, f"cta-button-{i+1}-clicked")
            # 返回首页
            page.goto('http://localhost:3000')
            page.wait_for_load_state('networkidle')
    
    # 测试导航栏
    print("\n📍 测试导航栏...")
    nav_links = page.locator('nav a, header a').all()
    print(f"   找到 {len(nav_links)} 个导航链接")
    
    for link in nav_links[:5]:  # 测试前5个导航链接
        text = link.text_content()
        href = link.get_attribute('href')
        if text and href:
            print(f"   导航链接: {text} -> {href}")
    
    # 检查控制台错误
    print("\n📍 检查控制台错误...")
    console_errors = []
    page.on("console", lambda msg: 
            console_errors.append(msg.text) if msg.type == "error" else None)
    
    # 重新加载页面触发控制台事件
    page.reload()
    page.wait_for_load_state('networkidle')
    
    if console_errors:
        record_issue(page, "首页控制台错误", "medium", 
                    f"首页加载时出现 {len(console_errors)} 个控制台错误", 
                    ["1. 打开首页", "2. 检查浏览器控制台"], 
                    "console-errors-homepage")

def test_library_page(page: Page):
    """测试配置库页面（/library）"""
    print("\n" + "="*60)
    print("测试配置库页面（/library）")
    print("="*60)
    
    page.goto('http://localhost:3000/library')
    page.wait_for_load_state('networkidle')
    take_screenshot(page, "library-initial")
    
    # 检查空状态
    print("\n📍 检查空状态显示...")
    empty_state = page.locator('[class*="empty"], [class*="no-config"]').first
    if empty_state.count() > 0:
        text = empty_state.text_content()
        print(f"   空状态消息: {text}")
        take_screenshot(page, "library-empty-state")
    else:
        # 检查是否有配置项
        config_items = page.locator('[class*="config-item"], [class*="configuration"]').all()
        print(f"   找到 {len(config_items)} 个配置项")
        if len(config_items) == 0:
            print("   ⚠️  未检测到空状态提示或配置项")
    
    # 测试配置创建
    print("\n📍 测试配置创建流程...")
    create_buttons = page.locator('button:has-text("创建"), button:has-text("Create"), button:has-text("新建")').all()
    print(f"   找到 {len(create_buttons)} 个创建按钮")
    
    for btn in create_buttons[:1]:  # 只测试第一个创建按钮
        success, _ = safe_action(page, "点击创建配置按钮", btn.click)
        if success:
            page.wait_for_timeout(1000)
            take_screenshot(page, "library-create-clicked")
            
            # 检查是否出现创建表单或模态框
            form = page.locator('form, [class*="modal"], [class*="dialog"]').first
            if form.count() > 0:
                print("   创建表单/模态框已打开")
                take_screenshot(page, "library-create-form")
                
                # 尝试填写表单
                inputs = page.locator('input:visible').all()
                for input_elem in inputs[:3]:
                    placeholder = input_elem.get_attribute('placeholder')
                    name = input_elem.get_attribute('name')
                    if placeholder or name:
                        test_value = "测试配置名称" if 'name' in str(placeholder or name).lower() else "test@example.com"
                        success, _ = safe_action(page, "填写表单输入", 
                                                input_elem.fill, test_value)
                        page.wait_for_timeout(200)
                
                take_screenshot(page, "library-create-form-filled")
                
                # 尝试关闭模态框
                close_btn = page.locator('button:has-text("取消"), button:has-text("Cancel"), button:has-text("关闭"), [class*="close"]').first
                if close_btn.count() > 0:
                    close_btn.click()
                    page.wait_for_timeout(500)
    
    # 测试删除功能（如果有配置项）
    print("\n📍 测试删除功能...")
    delete_buttons = page.locator('button:has-text("删除"), button:has-text("Delete"), [class*="delete"]').all()
    print(f"   找到 {len(delete_buttons)} 个删除按钮")
    
    if len(delete_buttons) > 0:
        for btn in delete_buttons[:1]:
            success, _ = safe_action(page, "点击删除按钮", btn.click)
            if success:
                page.wait_for_timeout(500)
                take_screenshot(page, "library-delete-clicked")
                
                # 检查确认对话框
                confirm_dialog = page.locator('[class*="confirm"], [class*="dialog"]').first
                if confirm_dialog.count() > 0:
                    print("   删除确认对话框已显示")
                    # 点击取消避免实际删除
                    cancel_btn = page.locator('button:has-text("取消"), button:has-text("Cancel")').first
                    if cancel_btn.count() > 0:
                        cancel_btn.click()
                        page.wait_for_timeout(300)
    
    # 测试分享功能
    print("\n📍 测试分享功能...")
    share_buttons = page.locator('button:has-text("分享"), button:has-text("Share"), [class*="share"]').all()
    print(f"   找到 {len(share_buttons)} 个分享按钮")
    
    for btn in share_buttons[:1]:
        success, _ = safe_action(page, "点击分享按钮", btn.click)
        if success:
            page.wait_for_timeout(500)
            take_screenshot(page, "library-share-clicked")
    
    # 测试搜索/过滤
    print("\n📍 测试搜索/过滤功能...")
    search_input = page.locator('input[type="search"], input[placeholder*="搜索"], input[placeholder*="Search"]').first
    if search_input.count() > 0:
        print("   找到搜索输入框")
        success, _ = safe_action(page, "输入搜索关键词", search_input.fill, "测试")
        if success:
            page.wait_for_timeout(500)
            take_screenshot(page, "library-search-filled")
            
            # 清空搜索
            search_input.fill("")
            page.wait_for_timeout(300)

def test_about_page(page: Page):
    """测试 About 页面"""
    print("\n" + "="*60)
    print("测试 About 页面")
    print("="*60)
    
    page.goto('http://localhost:3000/about')
    page.wait_for_load_state('networkidle')
    take_screenshot(page, "about-initial")
    
    # 检查内容渲染
    print("\n📍 检查内容渲染...")
    headings = page.locator('h1, h2, h3').all()
    print(f"   找到 {len(headings)} 个标题元素")
    
    if len(headings) == 0:
        record_issue(page, "About 页面内容缺失", "medium", 
                    "About 页面未找到任何标题元素，可能内容未正确加载", 
                    ["1. 导航到 /about", "2. 查找标题元素"], 
                    "about-missing-content")
    else:
        for i, heading in enumerate(headings[:3]):
            text = heading.text_content()
            print(f"   标题 {i+1}: {text}")
    
    # 检查响应式布局
    print("\n📍 测试响应式布局...")
    original_size = page.viewport_size
    
    # 测试移动端视口
    page.set_viewport_size({"width": 375, "height": 812})
    page.wait_for_timeout(500)
    take_screenshot(page, "about-mobile-viewport")
    
    # 检查内容是否仍然可见
    body_width = page.evaluate('() => document.body.scrollWidth')
    viewport_width = 375
    
    if body_width > viewport_width * 1.2:  # 允许20%溢出
        record_issue(page, "About 页面移动端布局溢出", "medium", 
                    f"移动端视口下内容宽度溢出 {body_width - viewport_width}px", 
                    ["1. 设置移动端视口 (375x812)", "2. 检查内容宽度"], 
                    "about-mobile-overflow")
    
    # 恢复原始视口
    page.set_viewport_size(original_size)
    page.wait_for_timeout(300)

def test_faq_page(page: Page):
    """测试 FAQ 页面"""
    print("\n" + "="*60)
    print("测试 FAQ 页面")
    print("="*60)
    
    page.goto('http://localhost:3000/faq')
    page.wait_for_load_state('networkidle')
    take_screenshot(page, "faq-initial")
    
    # 测试 Accordion 展开/折叠
    print("\n📍 测试 Accordion 展开/折叠...")
    accordion_items = page.locator('[class*="accordion"], [class*="faq-item"], details').all()
    print(f"   找到 {len(accordion_items)} 个 Accordion 项")
    
    if len(accordion_items) == 0:
        # 尝试其他选择器
        accordion_items = page.locator('button:has([class*="question"]), [class*="question"]').all()
        print(f"   使用备用选择器找到 {len(accordion_items)} 个项")
    
    for i, item in enumerate(accordion_items[:5]):  # 测试前5个
        # 尝试点击展开
        try:
            item.click()
            page.wait_for_timeout(300)
            take_screenshot(page, f"faq-item-{i+1}-expanded")
            
            # 检查是否展开
            expanded_content = page.locator('[class*="answer"], [class*="content"]').nth(i)
            if expanded_content.count() > 0:
                is_visible = expanded_content.is_visible()
                print(f"   Accordion 项 {i+1}: 展开={is_visible}")
            
            # 再次点击折叠
            item.click()
            page.wait_for_timeout(200)
        except Exception as e:
            print(f"   Accordion 项 {i+1} 操作失败: {e}")
    
    # 检查键盘导航
    print("\n📍 测试键盘导航...")
    if len(accordion_items) > 0:
        first_item = accordion_items[0]
        first_item.focus()
        page.wait_for_timeout(200)
        take_screenshot(page, "faq-keyboard-focus")
        
        # 检查焦点可见性
        focused_element = page.evaluate('() => document.activeElement.className')
        print(f"   焦点元素类名: {focused_element}")
        
        # 按 Enter 键测试
        page.keyboard.press('Enter')
        page.wait_for_timeout(300)
        take_screenshot(page, "faq-keyboard-enter")

def test_login_page(page: Page):
    """测试登录页面（/login）"""
    print("\n" + "="*60)
    print("测试登录页面（/login）")
    print("="*60)
    
    page.goto('http://localhost:3000/login')
    page.wait_for_load_state('networkidle')
    take_screenshot(page, "login-initial")
    
    # 测试 Tabs 切换
    print("\n📍 测试 Tabs 切换...")
    tabs = page.locator('[role="tab"], button:has-text("登录"), button:has-text("注册"), button:has-text("Login"), button:has-text("Register")').all()
    print(f"   找到 {len(tabs)} 个 Tab 按钮")
    
    for i, tab in enumerate(tabs[:2]):
        text = tab.text_content()
        print(f"   Tab {i+1}: {text}")
        success, _ = safe_action(page, f"点击 Tab {i+1}", tab.click)
        if success:
            page.wait_for_timeout(500)
            take_screenshot(page, f"login-tab-{i+1}-active")
    
    # 测试表单验证
    print("\n📍 测试表单验证...")
    inputs = page.locator('input:visible').all()
    print(f"   找到 {len(inputs)} 个输入框")
    
    # 测试空提交
    submit_buttons = page.locator('button[type="submit"], button:has-text("登录"), button:has-text("提交")').all()
    if len(submit_buttons) > 0:
        submit_btn = submit_buttons[0]
        
        # 清空所有输入框
        for input_elem in inputs:
            input_elem.fill("")
        
        # 尝试空提交
        success, _ = safe_action(page, "空表单提交", submit_btn.click)
        if success:
            page.wait_for_timeout(500)
            take_screenshot(page, "login-empty-submit")
            
            # 检查错误消息
            error_messages = page.locator('[class*="error"], [class*="validation"]').all()
            if len(error_messages) > 0:
                print(f"   显示 {len(error_messages)} 个验证错误")
                for msg in error_messages[:3]:
                    text = msg.text_content()
                    print(f"   错误消息: {text}")
            else:
                record_issue(page, "登录表单验证缺失", "medium", 
                            "空表单提交时未显示验证错误消息", 
                            ["1. 导航到 /login", "2. 清空所有输入框", "3. 点击提交按钮", "4. 检查错误提示"], 
                            "login-validation-missing")
    
    # 测试无效输入
    print("\n📍 测试无效输入验证...")
    email_input = page.locator('input[type="email"], input[name="email"], input[placeholder*="邮箱"]').first
    if email_input.count() > 0:
        # 输入无效邮箱格式
        success, _ = safe_action(page, "输入无效邮箱", email_input.fill, "invalid-email")
        if success:
            page.wait_for_timeout(200)
            
            # 点击其他地方触发验证
            password_input = page.locator('input[type="password"]').first
            if password_input.count() > 0:
                password_input.focus()
                page.wait_for_timeout(300)
                take_screenshot(page, "login-invalid-email")
                
                # 检查邮箱验证错误
                email_error = page.locator('[class*="email-error"], [class*="validation-error"]').first
                if email_error.count() > 0:
                    print(f"   邮箱验证错误: {email_error.text_content()}")
    
    # 测试有效输入
    print("\n📍 测试有效输入...")
    if email_input.count() > 0:
        email_input.fill("test@example.com")
        page.wait_for_timeout(200)
        
        if password_input.count() > 0:
            password_input.fill("password123")
            page.wait_for_timeout(200)
            take_screenshot(page, "login-valid-input")

def test_responsive_design(page: Page):
    """测试响应式设计"""
    print("\n" + "="*60)
    print("测试响应式设计")
    print("="*60)
    
    original_size = page.viewport_size
    
    # 测试多个视口尺寸
    viewports = [
        {"name": "mobile", "width": 375, "height": 812},
        {"name": "tablet", "width": 768, "height": 1024},
        {"name": "desktop", "width": 1920, "height": 1080}
    ]
    
    for viewport in viewports:
        print(f"\n📍 测试 {viewport['name']} 视口 ({viewport['width']}x{viewport['height']})...")
        page.set_viewport_size({"width": viewport['width'], "height": viewport['height']})
        page.goto('http://localhost:3000')
        page.wait_for_load_state('networkidle')
        take_screenshot(page, f"responsive-{viewport['name']}")
        
        # 检查汉堡菜单（移动端）
        if viewport['width'] < 768:
            hamburger_menu = page.locator('[class*="hamburger"], [class*="menu-toggle"], button:has([class*="icon"])').first
            if hamburger_menu.count() > 0:
                print("   找到汉堡菜单按钮")
                success, _ = safe_action(page, "点击汉堡菜单", hamburger_menu.click)
                if success:
                    page.wait_for_timeout(300)
                    take_screenshot(page, f"responsive-{viewport['name']}-menu-open")
                    
                    # 检查菜单是否展开
                    mobile_menu = page.locator('[class*="mobile-menu"], [class*="nav-menu"]').first
                    if mobile_menu.count() > 0:
                        is_visible = mobile_menu.is_visible()
                        print(f"   移动端菜单展开: {is_visible}")
                        if not is_visible:
                            record_issue(page, "移动端汉堡菜单未展开", "medium", 
                                        "点击汉堡菜单按钮后菜单未显示", 
                                        ["1. 设置移动端视口", "2. 点击汉堡菜单", "3. 检查菜单显示"], 
                                        f"mobile-menu-{viewport['name']}")
            
            # 检查内容溢出
            body_width = page.evaluate('() => document.body.scrollWidth')
            if body_width > viewport['width'] * 1.2:
                record_issue(page, f"{viewport['name']} 视口内容溢出", "medium", 
                            f"视口宽度 {viewport['width']}，内容宽度 {body_width}", 
                            ["1. 设置视口尺寸", "2. 检查内容宽度"], 
                            f"overflow-{viewport['name']}")
    
    # 恢复原始视口
    page.set_viewport_size(original_size)

def test_accessibility(page: Page):
    """测试无障碍功能"""
    print("\n" + "="*60)
    print("测试无障碍功能")
    print("="*60)
    
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    take_screenshot(page, "accessibility-initial")
    
    # 测试 Tab 键导航
    print("\n📍 测试 Tab 键导航...")
    focusable_elements = []
    
    for i in range(10):  # 尝试 Tab 10 次
        page.keyboard.press('Tab')
        page.wait_for_timeout(100)
        
        active_element = page.evaluate('''() => {
            const el = document.activeElement;
            return {
                tagName: el.tagName,
                className: el.className,
                text: el.textContent ? el.textContent.substring(0, 50) : '',
                href: el.href || '',
                type: el.type || ''
            };
        }''')
        
        focusable_elements.append(active_element)
        print(f"   Tab {i+1}: {active_element['tagName']} - {active_element['text'][:30]}")
    
    take_screenshot(page, "accessibility-tab-navigation")
    
    # 检查焦点可见性
    print("\n📍 检查焦点可见性...")
    page.keyboard.press('Tab')  # Tab 到第一个元素
    page.wait_for_timeout(100)
    
    has_focus_style = page.evaluate('''() => {
        const el = document.activeElement;
        const styles = window.getComputedStyle(el);
        return {
            hasOutline: styles.outline !== 'none' && styles.outlineWidth !== '0px',
            hasBoxShadow: styles.boxShadow !== 'none',
            focusVisible: el.matches(':focus-visible')
        };
    }''')
    
    if not (has_focus_style['hasOutline'] or has_focus_style['hasBoxShadow']):
        record_issue(page, "焦点可见性不足", "medium", 
                    "Tab 导航时焦点元素缺少明显的视觉指示（outline 或 box-shadow）", 
                    ["1. 使用 Tab 键导航", "2. 检查焦点元素样式"], 
                    "focus-visibility")
    else:
        print("   ✓ 焦点元素有可见的视觉指示")
    
    # 检查 aria-label
    print("\n📍 检查 aria-label...")
    interactive_elements = page.locator('button, a, input, select').all()
    elements_without_aria = 0
    
    for elem in interactive_elements[:20]:  # 检查前20个交互元素
        aria_label = elem.get_attribute('aria-label')
        aria_labelledby = elem.get_attribute('aria-labelledby')
        text_content = elem.text_content()
        
        # 如果元素没有文本内容且没有 aria-label，可能需要改进
        if (not text_content or text_content.strip() == '') and not aria_label:
            elements_without_aria += 1
    
    if elements_without_aria > 5:
        record_issue(page, "aria-label 缺失", "low", 
                    f"{elements_without_aria} 个交互元素缺少文本内容且没有 aria-label", 
                    ["1. 检查交互元素", "2. 验证 aria-label 属性"], 
                    "aria-label-missing")
    
    # 检查语义化 HTML
    print("\n📍 检查语义化 HTML...")
    semantic_elements = {
        'header': page.locator('header').count(),
        'nav': page.locator('nav').count(),
        'main': page.locator('main').count(),
        'footer': page.locator('footer').count(),
        'article': page.locator('article').count(),
        'section': page.locator('section').count()
    }
    
    print(f"   语义化元素统计:")
    for elem, count in semantic_elements.items():
        print(f"   {elem}: {count}")
    
    if semantic_elements['main'] == 0:
        record_issue(page, "缺少 main 元素", "low", 
                    "页面缺少语义化的 main 元素", 
                    ["1. 检查页面结构", "2. 查找 main 元素"], 
                    "semantic-main")

def generate_report():
    """生成测试报告"""
    print("\n" + "="*60)
    print("生成测试报告")
    print("="*60)
    
    report_path = os.path.join(OUTPUT_DIR, "report.md")
    
    # 统计严重性
    severity_counts = {
        "critical": 0,
        "high": 0,
        "medium": 0,
        "low": 0
    }
    
    for issue in issues:
        severity_counts[issue['severity']] += 1
    
    # 写入报告
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Veloform 项目测试报告\n\n")
        f.write(f"**测试日期**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"**测试工具**: Playwright\n")
        f.write(f"**目标 URL**: http://localhost:3000\n\n")
        
        f.write("## 测试概览\n\n")
        f.write("测试范围包括：\n")
        f.write("- 首页功能测试（Hero、Features、BikeTypeSelector、Pricing、CTA、导航）\n")
        f.write("- 配置库页面测试（空状态、CRUD、分享、搜索）\n")
        f.write("- About 页面测试\n")
        f.write("- FAQ 页面测试（Accordion、键盘导航）\n")
        f.write("- 登录页面测试（Tabs、表单验证）\n")
        f.write("- 响应式设计测试（移动端、平板、桌面）\n")
        f.write("- 无障碍测试（Tab 导航、焦点可见性、aria-label）\n\n")
        
        f.write("## 问题统计\n\n")
        f.write(f"- **严重**: {severity_counts['critical']}\n")
        f.write(f"- **高**: {severity_counts['high']}\n")
        f.write(f"- **中**: {severity_counts['medium']}\n")
        f.write(f"- **低**: {severity_counts['low']}\n")
        f.write(f"- **总计**: {len(issues)}\n\n")
        
        if issues:
            f.write("## 发现的问题\n\n")
            for issue in issues:
                f.write(f"### {issue['id']}: {issue['title']}\n\n")
                f.write(f"**严重性**: {issue['severity']}\n\n")
                f.write(f"**描述**: {issue['description']}\n\n")
                f.write(f"**URL**: {issue['url']}\n\n")
                f.write(f"**复现步骤**:\n")
                for step in issue['repro_steps']:
                    f.write(f"{step}\n")
                f.write("\n")
                if issue['screenshot']:
                    f.write(f"**截图**: `{issue['screenshot']}`\n\n")
                f.write("---\n\n")
        
        f.write("## 截图清单\n\n")
        screenshots = sorted([f for f in os.listdir(SCREENSHOTS_DIR) if f.endswith('.png')])
        for screenshot in screenshots:
            f.write(f"- `{os.path.join(SCREENSHOTS_DIR, screenshot)}`\n")
    
    print(f"\n✅ 报告已生成: {report_path}")
    print(f"📸 截图总数: {len([f for f in os.listdir(SCREENSHOTS_DIR) if f.endswith('.png')])}")
    print(f"⚠️  问题总数: {len(issues)}")

def main():
    """主测试流程"""
    print("\n" + "="*60)
    print("Veloform 项目全面测试")
    print("="*60)
    print(f"开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    with sync_playwright() as p:
        # 启动浏览器
        print("\n🚀 启动 Chromium 浏览器...")
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={"width": 1280, "height": 720}
        )
        page = context.new_page()
        
        # 收集控制台错误
        console_errors = []
        page.on("console", lambda msg: 
                console_errors.append({"type": msg.type, "text": msg.text}) 
                if msg.type in ["error", "warning"] else None)
        
        try:
            # 执行测试
            test_homepage(page)
            test_library_page(page)
            test_about_page(page)
            test_faq_page(page)
            test_login_page(page)
            test_responsive_design(page)
            test_accessibility(page)
            
            # 输出控制台错误汇总
            if console_errors:
                print("\n" + "="*60)
                print("控制台错误汇总")
                print("="*60)
                error_count = len([e for e in console_errors if e['type'] == 'error'])
                warning_count = len([e for e in console_errors if e['type'] == 'warning'])
                print(f"错误数: {error_count}")
                print(f"警告数: {warning_count}")
                
                if error_count > 0:
                    print("\n主要错误:")
                    for error in [e for e in console_errors if e['type'] == 'error'][:5]:
                        print(f"  - {error['text'][:100]}")
            
        finally:
            browser.close()
    
    # 生成报告
    generate_report()
    
    print("\n" + "="*60)
    print("测试完成")
    print("="*60)
    print(f"结束时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()