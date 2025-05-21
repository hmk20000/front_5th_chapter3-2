import { test, expect } from '@playwright/test';

// 캘린더 메인 페이지에서 일정 추가 버튼을 누르고 폼이 노출되는지 확인하는 기본 E2E 테스트

test.describe('캘린더 E2E', () => {
  test('메인 페이지 진입 및 일정 추가 폼 노출', async ({ page }) => {
    // 서버가 localhost:5173에서 실행된다고 가정
    await page.goto('http://localhost:5173');

    // 일정 추가 버튼(플로팅 버튼 등)을 찾는다. (버튼의 텍스트나 aria-label에 따라 수정 필요)
    const addButton = await page.getByRole('button', { name: /일정 추가|추가|Add/i });
    await expect(addButton).toBeVisible();
    await addButton.click();

    // 일정 입력 폼이 노출되는지 확인 (예: 제목 입력란)
    const titleInput = await page.getByLabel(/제목|Title/i);
    await expect(titleInput).toBeVisible();
  });
});
